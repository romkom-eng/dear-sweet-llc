import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]); // [{ product, variant, quantity }]
    const [isCartOpen, setIsCartOpen] = useState(false);

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
