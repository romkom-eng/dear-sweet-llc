import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import client from '../services/shopify';
import { useCart } from '../context/CartContext';

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addLineItem } = useCart();

    useEffect(() => {
        client.product.fetchAll().then((fetchedProducts) => {
            setProducts(fetchedProducts);
            setIsLoading(false);
        }).catch(err => {
            console.error('Error fetching products from Shopify:', err);
            setIsLoading(false);
        });
    }, []);

    const handleQuickAdd = (e, variantId) => {
        e.preventDefault(); // Prevent navigating to detail page on quick add click
        e.stopPropagation();
        addLineItem(variantId, 1);
    };

    return (
        <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 font-display">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">The Collection</h1>
                <p className="text-primary font-medium text-lg">Authentic Dubai Chewy Cookies delivered.</p>
            </div>

            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar justify-center md:justify-start">
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-6 text-sm font-semibold shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                    All Cookies
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="material-symbols-outlined text-primary text-4xl animate-spin">refresh</span>
                    <span className="ml-4 font-bold text-slate-500">Baking...</span>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-20 text-center">
                    <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">cookie</span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sold Out Today</h2>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">Our signature batches have sold out. Please check back later for our next drop.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => {
                        const firstVariant = product.variants[0];
                        const imageUrl = product.images.length > 0 ? product.images[0].src : '';
                        return (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group flex flex-col gap-3 pb-4 bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all shadow-sm hover:shadow-xl"
                            >
                                <div className="relative overflow-hidden aspect-[4/5] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                                    {imageUrl ? (
                                        <div
                                            className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${imageUrl})` }}
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-6xl text-slate-300">image</span>
                                    )}
                                    {/* Decorative Elements */}
                                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        Signature
                                    </div>
                                    <button
                                        onClick={(e) => handleQuickAdd(e, firstVariant.id)}
                                        className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>

                                <div className="px-4 py-2 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-1 gap-2">
                                        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">{product.title}</h3>
                                    </div>
                                    <p className="text-primary font-bold mb-2">${parseFloat(firstVariant.price.amount).toFixed(2)}</p>

                                    {product.description && (
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mt-auto">
                                            {product.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
