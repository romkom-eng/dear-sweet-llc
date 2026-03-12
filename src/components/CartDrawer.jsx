import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { isCartOpen, closeCart, checkout, removeLineItem, updateLineItem } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity"
                onClick={closeCart}
            />

            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-in-out font-display">
                <div className="flex items-center justify-between p-6 border-b border-primary/10">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Your Cart</h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-500">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {(!checkout || checkout.lineItems.length === 0) ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 opacity-50">
                            <span className="material-symbols-outlined text-6xl">shopping_bag</span>
                            <p className="font-medium">Your cart is empty.</p>
                        </div>
                    ) : (
                        checkout.lineItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-primary/10 bg-slate-50 dark:bg-slate-800/50">
                                <div
                                    className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-primary/10"
                                    style={{ backgroundImage: `url(${item.variant.image ? item.variant.image.src : ''})` }}
                                />
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{item.title}</h3>
                                        <button
                                            onClick={() => removeLineItem(item.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                    <p className="text-primary font-bold mt-1">${parseFloat(item.variant.price.amount).toFixed(2)}</p>

                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="flex items-center border border-primary/20 rounded-lg py-1 px-2 bg-white dark:bg-slate-900">
                                            <button
                                                onClick={() => updateLineItem(item.id, item.quantity - 1)}
                                                className="text-primary hover:text-slate-900 px-1"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-bold px-3 text-slate-900 dark:text-slate-100">{item.quantity}</span>
                                            <button
                                                onClick={() => updateLineItem(item.id, item.quantity + 1)}
                                                className="text-primary hover:text-slate-900 px-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {checkout && checkout.lineItems.length > 0 && (
                    <div className="p-6 border-t border-primary/10 bg-slate-50 dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Subtotal</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                ${parseFloat(checkout.subtotalPrice.amount).toFixed(2)}
                            </span>
                        </div>
                        <a
                            href={checkout.webUrl}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
                        >
                            <span className="material-symbols-outlined">lock</span>
                            Secure Checkout
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}
