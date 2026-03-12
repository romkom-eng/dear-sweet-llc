import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../services/shopify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initializeCheckout = async () => {
            try {
                const checkoutId = localStorage.getItem('shopify_checkout_id');
                if (checkoutId) {
                    const existingCheckout = await client.checkout.fetch(checkoutId);
                    if (existingCheckout && !existingCheckout.completedAt) {
                        setCheckout(existingCheckout);
                    } else {
                        const newCheckout = await client.checkout.create();
                        localStorage.setItem('shopify_checkout_id', newCheckout.id);
                        setCheckout(newCheckout);
                    }
                } else {
                    const newCheckout = await client.checkout.create();
                    localStorage.setItem('shopify_checkout_id', newCheckout.id);
                    setCheckout(newCheckout);
                }
            } catch (error) {
                console.error('Error initializing checkout:', error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeCheckout();
    }, []);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addLineItem = async (variantId, quantity) => {
        if (!checkout) return;
        openCart();
        try {
            const lineItemsToAdd = [{ variantId, quantity }];
            const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
            setCheckout(updatedCheckout);
        } catch (error) {
            console.error('Error adding line item:', error);
        }
    };

    const removeLineItem = async (lineItemId) => {
        if (!checkout) return;
        try {
            const updatedCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
            setCheckout(updatedCheckout);
        } catch (error) {
            console.error('Error removing line item:', error);
        }
    };

    const updateLineItem = async (lineItemId, quantity) => {
        if (!checkout) return;
        try {
            const lineItemsToUpdate = [{ id: lineItemId, quantity }];
            const updatedCheckout = await client.checkout.updateLineItems(checkout.id, lineItemsToUpdate);
            setCheckout(updatedCheckout);
        } catch (error) {
            console.error('Error updating line item:', error);
        }
    };

    const value = {
        checkout,
        isCartOpen,
        isInitializing,
        openCart,
        closeCart,
        addLineItem,
        removeLineItem,
        updateLineItem,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
