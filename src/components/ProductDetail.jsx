import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../services/shopify';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addLineItem } = useCart();

    useEffect(() => {
        // Basic formatting of the decoded ID if it's purely base64
        // Note: react-router id params might need decoding if passed directly
        client.product.fetch(id).then((fetchedProduct) => {
            setProduct(fetchedProduct);
            setIsLoading(false);
        }).catch(err => {
            console.error('Error fetching product from Shopify:', err);
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex flex-1 justify-center items-center py-20 h-[60vh]">
                <span className="material-symbols-outlined text-primary text-4xl animate-spin">refresh</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-1 justify-center items-center py-20 h-[60vh] flex-col text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">search_off</span>
                <h2 className="text-2xl font-bold">Product Not Found</h2>
                <Link to="/menu" className="mt-4 text-primary hover:underline font-bold">Return to Menu</Link>
            </div>
        );
    }

    const firstVariant = product.variants[0];
    const mainImage = product.images.length > 0 ? product.images[0].src : '';

    const handleAddToCart = () => {
        if (firstVariant) {
            addLineItem(firstVariant.id, quantity);
        }
    };

    return (
        <main className="flex-1 px-6 py-8 lg:px-20 lg:py-12 font-display">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Images */}
                    <div className="w-full">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            {mainImage ? (
                                <div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${mainImage})` }}
                                />
                            ) : (
                                <span className="material-symbols-outlined text-6xl text-slate-300">image</span>
                            )}
                        </div>

                        {/* Gallery Thumbs */}
                        {product.images.length > 1 && (
                            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {product.images.map((img, i) => (
                                    <div
                                        key={img.id}
                                        className="h-24 w-24 shrink-0 rounded-lg bg-cover bg-center cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all bg-slate-100"
                                        style={{ backgroundImage: `url(${img.src})` }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info Area */}
                    <div className="flex flex-col">
                        <nav className="flex mb-6 text-sm text-slate-500 dark:text-slate-400">
                            <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
                            <span className="mx-2">/</span>
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">{product.title}</span>
                        </nav>

                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">
                                ${parseFloat(firstVariant.price.amount).toFixed(2)}
                            </span>
                        </div>

                        <div className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-8 whitespace-pre-wrap">
                            {product.description || "The original signature Dubai crispy stuffed chewy cookie."}
                        </div>

                        {/* Action Area */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-primary/20 rounded-xl px-4 py-2 bg-white dark:bg-slate-900 shadow-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <div className="w-12 text-center font-bold text-lg text-slate-900 dark:text-slate-100">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!firstVariant.available}
                                className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {firstVariant.available ? "Add to Cart" : "Sold Out"}
                            </button>
                        </div>

                        {/* Product Badges */}
                        <div className="border-t border-primary/10 pt-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-primary/5">
                                    <span className="material-symbols-outlined text-primary mb-1 text-2xl">eco</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Real Pistachio</span>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-primary/5">
                                    <span className="material-symbols-outlined text-primary mb-1 text-2xl">bakery_dining</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Hand Spun Kadayif</span>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-primary/5">
                                    <span className="material-symbols-outlined text-primary mb-1 text-2xl">sell</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Fast Shipping</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
