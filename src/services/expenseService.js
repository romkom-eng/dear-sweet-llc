import { db, storage, isMockMode } from '../firebase/config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { COLLECTIONS } from '../firebase/schema';

/**
 * Upload a receipt, save expense record, and update ingredient unit price.
 * @param {File} file 
 * @param {Object} expenseData - { amount, tax_category, date, ingredientId }
 */
export const uploadExpenseAndProcessReceipt = async (file, expenseData) => {
    if (isMockMode) return { expenseId: 'mock-exp-id', downloadURL: 'https://via.placeholder.com/150' };
    const { amount, tax_category, date, ingredientId } = expenseData;

    // 1. Upload to Firebase Storage
    const storageRef = ref(storage, `receipts/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // 2. Save Expense record to Firestore
    const expenseRef = await addDoc(collection(db, COLLECTIONS.EXPENSES), {
        image_url: downloadURL,
        amount: amount,
        tax_category: tax_category,
        date: date || new Date(),
        status: 'Processed'
    });

    // 3. If it's a 'Materials' category and ingredientId is provided, 
    // update the last_unit_price of the ingredient.
    if (tax_category === 'Materials' && ingredientId) {
        const ingredientRef = doc(db, COLLECTIONS.INGREDIENTS, ingredientId);
        // Assuming the amount is the total for a certain unit quantity. 
        // In a real OCR scenario, we'd extract the per-unit price.
        // For now, we update the last_unit_price directly.
        await updateDoc(ingredientRef, {
            last_unit_price: amount // Simplified: assumes amount is per unit
        });
    }

    return { expenseId: expenseRef.id, downloadURL };
};
