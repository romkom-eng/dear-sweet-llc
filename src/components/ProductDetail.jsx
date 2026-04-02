import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductReviews from './ProductReviews';

export default function ProductDetail() {
    const { id } = useParams();
    const product = getProductById(id);
    const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const { addItem, openCart } = useCart();

    if (!product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="text-6xl mb-6">🍪</div>
            <h2 className="text-2xl font-display font-bold text-primary mb-2">Flavor Not Found</h2>
            <p className="text-text-light/60 mb-8">This sweet treat seems to have vanished from our bakery.</p>
            <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
                Back to Menu
            </Link>
        </div>
    );

    const handleAdd = () => {
        addItem(product, selectedVariant, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        openCart();
    };

    return (
        <div className="max-w-6xl mx-auto pb-32 font-body scroll-smooth">
            {/* ── Top Navigation ── */}
            <div className="px-6 py-8 flex items-center justify-between">
                <Link to="/menu" className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-secondary/5 text-primary hover:scale-110 transition-transform flex items-center gap-2 font-bold text-sm">
                    <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Menu</span>
                </Link>
                <div className="flex gap-3">
                    <button className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-secondary/5 text-secondary hover:text-primary transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button className="p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-secondary/5 text-secondary hover:text-primary transition-colors">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* ── Image Gallery (Column 1) ── */}
                <div className="space-y-6">
                    <div className="aspect-square rounded-[3rem] overflow-hidden shadow-premium border-8 border-white dark:border-background-dark relative group">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-8 left-8 flex flex-col gap-3">
                            {product.tags.map(t => (
                                <span key={t} className="bg-white/95 dark:bg-black/80 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] lg:text-xs font-bold text-primary dark:text-accent tracking-widest shadow-lg border border-secondary/10">
                                    {t.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Product Info (Column 2) ── */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex text-accent gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <a href="#reviews" className="text-xs font-bold text-text-light/40 hover:text-primary transition-colors uppercase tracking-[0.2em]">(2,400+ Trusted Reviews)</a>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-display font-bold text-primary dark:text-white mb-3 leading-[1.1]">
                        {product.title}
                    </h1>

                    <p className="text-xs lg:text-sm text-accent font-bold uppercase tracking-[0.3em] mb-8">
                        {product.subtitle || 'DEAR SWEET SIGNATURE'}
                    </p>

                    <div className="text-4xl lg:text-5xl font-bold text-primary dark:text-white mb-8">
                        ${(selectedVariant?.price || product.price).toFixed(2)}
                    </div>

                    <p className="text-sm lg:text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed mb-10 border-l-4 border-accent/20 pl-6 py-2 italic bg-primary/5 rounded-r-2xl pr-6">
                        {product.description}
                    </p>

                    {/* ── Variants ── */}
                    {product.variants.length > 1 && (
                        <div className="mb-10">
                            <h3 className="text-[10px] lg:text-xs font-bold text-text-light/40 uppercase tracking-[0.2em] mb-6">Select Pack Size</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {product.variants.map(v => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`py-5 px-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${selectedVariant?.id === v.id
                                            ? 'border-primary bg-primary/5 dark:bg-primary/20 scale-[1.05] shadow-md'
                                            : 'border-secondary/10 bg-white dark:bg-surface-dark hover:border-primary/50'
                                            }`}
                                    >
                                        <span className={`text-sm lg:text-base font-bold ${selectedVariant?.id === v.id ? 'text-primary dark:text-white' : 'text-text-light/60'}`}>
                                            {v.label}
                                        </span>
                                        <span className="text-xs font-bold opacity-60">
                                            ${v.price.toFixed(2)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Quantity & Add (Desktop Integrated) ── */}
                    <div className="hidden lg:flex flex-col gap-6 mb-12">
                        <div className="flex items-center justify-between bg-white dark:bg-surface-dark p-5 rounded-3xl border border-secondary/10 shadow-soft">
                            <span className="text-sm font-bold text-text-light/50 ml-2 uppercase tracking-widest">Quantity</span>
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 rounded-full border-2 border-secondary/10 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all active:scale-90"
                                >
                                    <span className="text-2xl">−</span>
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={qty}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value, 10);
                                        if (!isNaN(val) && val > 0) setQty(val);
                                        else if (e.target.value === '') setQty('');
                                    }}
                                    onBlur={(e) => {
                                        if (qty === '' || isNaN(qty) || qty < 1) setQty(1);
                                    }}
                                    className="font-bold text-2xl w-[60px] text-center bg-transparent border-none outline-none p-0 cart-qty-input"
                                />
                                <button
                                    onClick={() => setQty(q => q + 1)}
                                    className="w-12 h-12 rounded-full border-2 border-secondary/10 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-all active:scale-90"
                                >
                                    <span className="text-2xl">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Playful Brand Voice */}
                        <div className="flex justify-center -mb-2">
                            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] bg-accent/5 px-4 py-1 rounded-full border border-accent/10">
                                🤫 Sharing is optional
                            </span>
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={added}
                            className={`w-full h-20 rounded-3xl font-display font-bold text-lg tracking-[0.2em] uppercase flex items-center justify-center gap-4 shadow-xl transition-all active:scale-95 ${added
                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                : 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'
                                }`}
                        >
                            <ShoppingBag size={24} />
                            {added ? '✓ Added to Box' : `Add to Cart • $${((selectedVariant?.price || product.price) * qty).toFixed(2)}`}
                        </button>
                    </div>

                    {/* ── Mobile Quantity (Visible only on mobile) ── */}
                    <div className="lg:hidden flex items-center justify-between mb-10 bg-white dark:bg-surface-dark p-4 rounded-[2rem] border border-secondary/10 shadow-soft">
                        <span className="text-xs font-bold text-text-light/50 ml-2 uppercase tracking-widest">Quantity</span>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                className="w-10 h-10 rounded-full border border-secondary/10 flex items-center justify-center text-primary font-bold active:scale-90"
                            >
                                <span className="text-xl">−</span>
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (!isNaN(val) && val > 0) setQty(val);
                                    else if (e.target.value === '') setQty('');
                                }}
                                onBlur={(e) => {
                                    if (qty === '' || isNaN(qty) || qty < 1) setQty(1);
                                }}
                                className="font-bold text-lg w-[40px] text-center bg-transparent border-none outline-none p-0 cart-qty-input"
                            />
                            <button
                                onClick={() => setQty(q => q + 1)}
                                className="w-10 h-10 rounded-full border border-secondary/10 flex items-center justify-center text-primary font-bold active:scale-90"
                            >
                                <span className="text-xl">+</span>
                            </button>
                        </div>
                    </div>

                    {/* ── Trust Badges ── */}
                    <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-10">
                        <div className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-surface-dark border border-secondary/5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                            <ShieldCheck size={24} className="text-primary" />
                            <span className="text-[10px] font-bold text-text-light/50 uppercase tracking-widest text-center">Handmade Fresh</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-surface-dark border border-secondary/5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                            <Truck size={24} className="text-primary" />
                            <span className="text-[10px] font-bold text-text-light/50 uppercase tracking-widest text-center">Express Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-surface-dark border border-secondary/5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                            <RotateCcw size={24} className="text-primary" />
                            <span className="text-[10px] font-bold text-text-light/50 uppercase tracking-widest text-center">Fresh Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Product Reviews Section ── */}
            <div className="px-6">
                <ProductReviews productId={product.id} />
            </div>

            {/* ── Mobile Add to Cart Bar (Hidden on Desktop) ── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-secondary/10 p-4 pb-safe z-40">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleAdd}
                        disabled={added}
                        className={`w-full h-16 rounded-2xl font-display font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 ${added
                            ? 'bg-emerald-500 text-white'
                            : 'bg-primary text-white shadow-primary/30'
                            }`}
                    >
                        <ShoppingBag size={20} />
                        {added ? '✓ Added!' : `Add • $${((selectedVariant?.price || product.price) * qty).toFixed(2)}`}
                    </button>
                </div>
            </div>
        </div>
    );
}
