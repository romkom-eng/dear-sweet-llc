import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Star, Heart, Sliders, ChevronRight, User } from 'lucide-react';

export default function Menu() {
    const [search, setSearch] = useState('');
    const { addItem, openCart } = useCart();

    const filtered = PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    const handleAdd = (p) => {
        addItem(p, p.variants[0], 1);
        openCart();
    };

    return (
        <div className="max-w-6xl mx-auto pb-24 font-body scroll-smooth">
            {/* ── Page Header ── */}
            <header className="px-6 pt-16 pb-8 text-center max-w-2xl mx-auto">
                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full mb-4 uppercase tracking-[0.25em] inline-block">
                    Freshly Baked
                </span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-primary dark:text-white mb-4 tracking-tight">Our Menu</h1>
                <p className="text-sm lg:text-lg text-text-light/60 dark:text-text-dark/60 leading-relaxed">
                    Handcrafted Dubai chocolate cookies made with premium ingredients and curated with love.
                </p>
            </header>

            {/* ── Search & Filter ── */}
            <div className="px-6 mb-12 max-w-3xl mx-auto">
                <div className="flex gap-4">
                    <div className="relative flex-grow">
                        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light/30" />
                        <input
                            type="text"
                            placeholder="Find your flavor..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-surface-dark border border-secondary/10 rounded-2xl py-5 pl-14 pr-6 text-base lg:text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-soft transition-all placeholder:text-text-light/20"
                        />
                    </div>
                    <button className="p-5 bg-white dark:bg-surface-dark border border-secondary/10 rounded-2xl shadow-soft text-primary hover:bg-primary hover:text-white transition-all active:scale-95">
                        <Sliders size={22} />
                    </button>
                </div>
            </div>

            <div className="flex gap-4 px-6 mb-12 overflow-x-auto pb-2 hide-scrollbar lg:justify-center">
                <button className="px-8 py-3 bg-primary text-white rounded-full font-bold text-xs lg:text-sm shadow-lg shadow-primary/20 shrink-0">All Sweets</button>
            </div>

            {/* ── Products List ── */}
            <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {filtered.length === 0 ? (
                    <div className="col-span-full text-center py-24 bg-white dark:bg-surface-dark rounded-[2.5rem] border-2 border-dashed border-secondary/20">
                        <p className="text-text-light/40 italic text-lg">No flavors found matching "{search}"</p>
                    </div>
                ) : (
                    filtered.map(p => (
                        <div key={p.id} className="bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden shadow-soft border border-secondary/5 flex flex-col sm:flex-row gap-6 p-5 group hover:shadow-xl transition-all border border-secondary/10">
                            <Link to={`/product/${p.id}`} className="shrink-0 w-full sm:w-40 h-48 sm:h-40 rounded-2xl overflow-hidden relative shadow-sm bg-background-light">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {p.tags[0] && (
                                    <div className="absolute top-3 left-3 bg-primary/95 text-white text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                        {p.tags[0]}
                                    </div>
                                )}
                            </Link>

                            <div className="flex flex-col flex-grow justify-between py-2">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <Link to={`/product/${p.id}`}>
                                            <h3 className="font-display font-bold text-xl lg:text-2xl text-primary dark:text-white leading-tight hover:text-accent transition-colors">
                                                {p.title}
                                            </h3>
                                        </Link>
                                        <button className="text-secondary/40 hover:text-primary transition-colors p-1">
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                    <p className="text-xs lg:text-sm text-text-light/60 dark:text-text-dark/40 line-clamp-2 lg:line-clamp-3 leading-relaxed mb-4">
                                        {p.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="font-bold text-primary dark:text-white text-xl">
                                        ${p.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleAdd(p)}
                                        className="bg-accent hover:bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-accent/20"
                                    >
                                        <ShoppingBag size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ── Mobile Tab Bar (Matching Snippet) ── */}
            <nav className="fixed bottom-0 left-0 right-0 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-secondary/20 dark:border-white/10 z-50 pb-safe pt-2">
                <div className="max-w-md mx-auto flex justify-around items-center h-16">
                    <Link to="/" className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <Star size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>
                    <Link to="/menu" className="flex flex-col items-center justify-center w-16 h-full text-primary">
                        <ShoppingBag size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Shop</span>
                    </Link>
                    <button className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <Heart size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Saved</span>
                    </button>
                    <Link to="/profile" className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <span className="material-icons mb-1" style={{ fontSize: 22 }}>person</span>
                        <span className="text-[10px] font-bold">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
