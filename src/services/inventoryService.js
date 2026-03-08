import { db, isMockMode } from '../firebase/config';
import { collection, addDoc, doc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { COLLECTIONS } from '../firebase/schema';

/**
 * Perform an inventory audit (Stock Take).
 * Records the variance and updates the current stock.
 * @param {string} ingredientId 
 * @param {number} actualStock 
 * @param {string} reason 
 */
export const performInventoryAudit = async (ingredientId, actualStock, reason) => {
    if (isMockMode) return { variance: actualStock - 1000 }; // Dummy variance
    const ingredientRef = doc(db, COLLECTIONS.INGREDIENTS, ingredientId);
    const ingredientSnap = await getDoc(ingredientRef);

    if (!ingredientSnap.exists()) {
        throw new Error('Ingredient not found');
    }

    const systemStock = ingredientSnap.data().current_stock;
    const variance = actualStock - systemStock;

    const logData = {
        date: new Date(),
        ingredient_id: ingredientId,
        system_stock: systemStock,
        actual_stock: actualStock,
        variance: variance,
        reason: reason
    };

    const batch = writeBatch(db);

    // 1. Record the log
    const logRef = doc(collection(db, COLLECTIONS.INVENTORY_LOGS));
    batch.set(logRef, logData);

    // 2. Update actual stock
    batch.update(ingredientRef, {
        current_stock: actualStock
    });

    await batch.commit();
    return { variance };
};
