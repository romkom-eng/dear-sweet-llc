import { db, isMockMode } from '../firebase/config';
import { collection, addDoc, doc, getDoc, updateDoc, writeBatch, query, where, getDocs } from 'firebase/firestore';
import { COLLECTIONS } from '../firebase/schema';

/**
 * Calculate the cost of ingredients for a specific product quantity.
 * @param {string} productType 
 * @param {number} quantity 
 */
export const calculateCOGS = async (productType, quantity) => {
    if (isMockMode) return quantity * 2.4; // Dummy COGS: $2.4 per quantity
    const recipesQuery = query(
        collection(db, COLLECTIONS.RECIPES),
        where('product_id', '==', productType)
    );

    const recipeDocs = await getDocs(recipesQuery);
    let totalCost = 0;

    for (const recipeDoc of recipeDocs.docs) {
        const recipeData = recipeDoc.data();
        const ingredientRef = doc(db, COLLECTIONS.INGREDIENTS, recipeData.ingredient_id);
        const ingredientSnap = await getDoc(ingredientRef);

        if (ingredientSnap.exists()) {
            const ingredientData = ingredientSnap.data();
            const costForThisIngredient = recipeData.amount_required * quantity * ingredientData.last_unit_price;
            totalCost += costForThisIngredient;
        }
    }

    return totalCost;
};

/**
 * Register a sale and automatically deduct inventory.
 * @param {Object} salesData 
 */
export const registerSale = async (salesData) => {
    if (isMockMode) {
        return { id: 'mock-sale-id', totalNetProfit: (salesData.quantity * salesData.unit_price) * 0.7, perPersonProfit: ((salesData.quantity * salesData.unit_price) * 0.7) / salesData.participants.length };
    }
    const {
        product_type,
        quantity,
        unit_price,
        commission_fee,
        booth_fee,
        participants,
    } = salesData;

    // 1. Calculate COGS
    const cogs = await calculateCOGS(product_type, quantity);

    // 2. Calculate Net Profit
    // 수익 계산식: (매출 - (레시피 원가 * 수량) - 수수료 - 입점비) / 선택된 참여 인원수
    const totalRevenue = unit_price * quantity;
    const totalNetProfit = totalRevenue - cogs - commission_fee - booth_fee;
    const perPersonProfit = totalNetProfit / participants.length;

    const finalSalesData = {
        ...salesData,
        date: new Date(),
        net_profit: totalNetProfit,
        cogs: cogs,
    };

    const batch = writeBatch(db);

    // 3. Add Sales Entry
    const salesRef = doc(collection(db, COLLECTIONS.SALES_ENTRIES));
    batch.set(salesRef, finalSalesData);

    // 4. Deduct Inventory
    const recipesQuery = query(
        collection(db, COLLECTIONS.RECIPES),
        where('product_id', '==', product_type)
    );
    const recipeDocs = await getDocs(recipesQuery);

    for (const recipeDoc of recipeDocs.docs) {
        const recipeData = recipeDoc.data();
        const ingredientRef = doc(db, COLLECTIONS.INGREDIENTS, recipeData.ingredient_id);
        const ingredientSnap = await getDoc(ingredientRef);

        if (ingredientSnap.exists()) {
            const currentStock = ingredientSnap.data().current_stock;
            const deductionAmount = recipeData.amount_required * quantity;
            batch.update(ingredientRef, {
                current_stock: currentStock - deductionAmount
            });
        }
    }

    await batch.commit();
    return { id: salesRef.id, totalNetProfit, perPersonProfit };
};
