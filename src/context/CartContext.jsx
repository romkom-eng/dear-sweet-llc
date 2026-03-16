import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]); // [{ product, variant, quantity }]
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();
    const initialSyncRef = useRef(false);

    // 1. Sync Cart with Firestore when user logs in
    useEffect(() => {
        const syncCartWithDb = async () => {
            if (!user) {
                initialSyncRef.current = false;
                return;
            }

            try {
                const cartDocRef = doc(db, 'carts', user.uid);
                const cartSnap = await getDoc(cartDocRef);

                if (cartSnap.exists()) {
                    const dbItems = cartSnap.data().items || [];

                    // Merge Guest Items into DB Items
                    setItems(prevGuestItems => {
                        const merged = [...dbItems];
                        prevGuestItems.forEach(guestItem => {
                            const index = merged.findIndex(i => i.variant.id === guestItem.variant.id);
                            if (index >= 0) {
                                merged[index].quantity += guestItem.quantity;
                            } else {
                                merged.push(guestItem);
                            }
                        });
                        return merged;
                    });
                }
                initialSyncRef.current = true;
            } catch (err) {
                console.error('Error syncing cart:', err);
            }
        };

        syncCartWithDb();
    }, [user]);

    // 2. Save items to Firestore whenever they change
    useEffect(() => {
        if (!user || !initialSyncRef.current) return;

        const timer = setTimeout(async () => {
            try {
                await setDoc(doc(db, 'carts', user.uid), {
                    items,
                    updatedAt: new Date().toISOString()
                });
            } catch (err) {
                console.error('Error saving cart:', err);
            }
        }, 500); // 500ms debounce to avoid too many writes

        return () => clearTimeout(timer);
    }, [items, user]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addItem = (product, variant, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.variant.id === variant.id);
            if (existing) {
                return prev.map(i =>
                    i.variant.id === variant.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { product, variant, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (variantId) => {
        setItems(prev => prev.filter(i => i.variant.id !== variantId));
    };

    const updateQuantity = (variantId, quantity) => {
        if (quantity <= 0) {
            removeItem(variantId);
            return;
        }
        setItems(prev =>
            prev.map(i => i.variant.id === variantId ? { ...i, quantity } : i)
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((t, i) => t + i.quantity, 0);
    const subtotal = items.reduce((t, i) => t + i.variant.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            isCartOpen,
            openCart,
            closeCart,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
