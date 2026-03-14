import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';

// Seeds Firestore with static products if the collection is empty
async function seedIfEmpty() {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) {
        for (const p of STATIC_PRODUCTS) {
            await setDoc(doc(db, 'products', p.id), p);
        }
    }
}

export function useProducts() {
    const [products, setProducts] = useState(STATIC_PRODUCTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        seedIfEmpty().catch(console.error);

        // Live listener — updates automatically when admin edits in Firestore
        const unsubscribe = onSnapshot(collection(db, 'products'), (snap) => {
            if (!snap.empty) {
                const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                // keep consistent order
                data.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
                setProducts(data);
            }
            setLoading(false);
        }, (err) => {
            console.error('Firestore error:', err);
            setLoading(false); // fall back to static data
        });

        return unsubscribe;
    }, []);

    return { products, loading };
}
