import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Heart, ChevronRight, User, ChevronLeft, Gift, Truck } from 'lucide-react';

// ────── Banner Data ──────────────────────────────────────────────
const BANNERS = [
    {
        id: 1,
        image: '/banner2.png',           // Original Dubai Chewy Cookie
        objectPosition: '15% center',
        cta: 'Order Now',
        to: '/product/original-dubai-chewy',
    },
    {
        id: 2,
        image: '/banner1.png',           // Strawberry Dubai Chewy Cookie
        objectPosition: '15% center',
        cta: 'Try It',
        to: '/product/strawberry-dubai-chewy',
    },
    {
        id: 3,
        image: '/banner3.png',           // Gift Box
        objectPosition: '10% 10%',       // Shifts image right and down
        cta: 'Shop Gift Sets',
        to: '/menu',
    },
];

// ────── Category SVG Illustrations ───────────────────────────────
const CategoryIcon = ({ id }) => {
    const icons = {
        all: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <circle cx="14" cy="14" r="8" fill="#C8956C" />
                <circle cx="11" cy="11" r="1.5" fill="#5C3D1E" />
                <circle cx="17" cy="12" r="1.2" fill="#5C3D1E" />
                <circle cx="13" cy="16" r="1.3" fill="#5C3D1E" />
                <circle cx="34" cy="14" r="8" fill="#C8956C" />
                <circle cx="31" cy="11" r="1.5" fill="#5C3D1E" />
                <circle cx="37" cy="12" r="1.2" fill="#5C3D1E" />
                <circle cx="33" cy="16" r="1.3" fill="#5C3D1E" />
                <circle cx="14" cy="34" r="8" fill="#C8956C" />
                <circle cx="11" cy="31" r="1.5" fill="#5C3D1E" />
                <circle cx="17" cy="32" r="1.2" fill="#5C3D1E" />
                <circle cx="13" cy="36" r="1.3" fill="#5C3D1E" />
                <circle cx="34" cy="34" r="8" fill="#C8956C" />
                <circle cx="31" cy="31" r="1.5" fill="#5C3D1E" />
                <circle cx="37" cy="32" r="1.2" fill="#5C3D1E" />
                <circle cx="33" cy="36" r="1.3" fill="#5C3D1E" />
            </svg>
        ),
        original: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <ellipse cx="24" cy="27" rx="17" ry="12" fill="#4A2C0A" />
                <ellipse cx="24" cy="24" rx="17" ry="12" fill="#6B3A1F" />
                <ellipse cx="24" cy="22" rx="14" ry="9" fill="#8B9D4B" />
                <ellipse cx="24" cy="22" rx="11" ry="7" fill="#A0B055" />
                <circle cx="18" cy="20" r="2" fill="#5C6E2A" />
                <circle cx="26" cy="18" r="1.5" fill="#5C6E2A" />
                <circle cx="30" cy="23" r="2" fill="#5C6E2A" />
                <circle cx="21" cy="25" r="1.5" fill="#5C6E2A" />
                <ellipse cx="24" cy="36" rx="7" ry="2" fill="#3A1F08" opacity="0.4" />
            </svg>
        ),
        strawberry: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M24 8 C18 8 12 14 12 22 C12 30 18 40 24 42 C30 40 36 30 36 22 C36 14 30 8 24 8Z" fill="#E8524A" />
                <path d="M24 8 C21 4 16 4 15 8" stroke="#5C9A2A" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M24 8 C24 3 20 2 18 5" stroke="#5C9A2A" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M24 8 C27 3 30 4 30 8" stroke="#5C9A2A" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="19" cy="20" r="1.5" fill="#F8827A" />
                <circle cx="26" cy="17" r="1" fill="#F8827A" />
                <circle cx="29" cy="24" r="1.5" fill="#F8827A" />
                <circle cx="21" cy="28" r="1" fill="#F8827A" />
                <circle cx="17" cy="26" r="0.8" fill="#F8827A" />
                <line x1="19" y1="20" x2="19" y2="22" stroke="#F8C0BD" strokeWidth="0.5" />
                <line x1="26" y1="17" x2="26" y2="19" stroke="#F8C0BD" strokeWidth="0.5" />
                <line x1="29" y1="24" x2="29" y2="26" stroke="#F8C0BD" strokeWidth="0.5" />
            </svg>
        ),
        giftbox: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <rect x="8" y="20" width="32" height="22" rx="2" fill="#E85D4A" />
                <rect x="8" y="14" width="32" height="8" rx="2" fill="#FF7B6B" />
                <rect x="22" y="14" width="4" height="28" fill="#FFD700" />
                <rect x="8" y="18" width="32" height="4" fill="#FFD700" />
                <path d="M24 14 C24 14 18 8 20 4 C22 0 26 4 24 8" fill="#E05252" />
                <path d="M24 14 C24 14 30 8 28 4 C26 0 22 4 24 8" fill="#E05252" />
                <circle cx="24" cy="6" r="3" fill="#FF9900" />
            </svg>
        ),
        new: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M24 4L27.5 16.5L40 13L31 22.5L43 28L30.5 29.5L31 43L24 33L17 43L17.5 29.5L5 28L17 22.5L8 13L20.5 16.5Z" fill="#FFD700" stroke="#FFB800" strokeWidth="1" strokeLinejoin="round" />
                <path d="M24 8L26.5 17.5L36 15L29 22.5L39 27.5L28 28.5L28.5 40L24 32L19.5 40L20 28.5L9 27.5L19 22.5L12 15L21.5 17.5Z" fill="#FFF176" opacity="0.5" />
                <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#B8860B" fontFamily="sans-serif">NEW</text>
            </svg>
        ),
        best: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M24 6L28.5 17.5L41 18L31.5 26.5L34.5 39L24 32.5L13.5 39L16.5 26.5L7 18L19.5 17.5Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M24 10L27.5 20L38 20.5L30 27.5L32.5 38L24 33L15.5 38L18 27.5L10 20.5L20.5 20Z" fill="#FFE566" />
            </svg>
        ),
        shipping: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <rect x="2" y="18" width="28" height="16" rx="2" fill="#4A90D9" />
                <rect x="2" y="18" width="28" height="16" rx="2" fill="#5BA3E8" />
                <path d="M30 22L44 26V34H30Z" fill="#3A7BC8" />
                <path d="M30 22L44 26" stroke="#2A6AB8" strokeWidth="1" />
                <circle cx="11" cy="36" r="4" fill="#2A2A2A" />
                <circle cx="11" cy="36" r="2.5" fill="#888" />
                <circle cx="37" cy="36" r="4" fill="#2A2A2A" />
                <circle cx="37" cy="36" r="2.5" fill="#888" />
                <rect x="6" y="22" width="18" height="8" rx="1" fill="#7EC8F0" opacity="0.5" />
                <path d="M6 24 H24" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
                <path d="M6 27 H24" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
            </svg>
        ),
        about: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <path d="M24 6C14 6 9 14 9 22C9 30 14 36 20 38L24 43L28 38C34 36 39 30 39 22C39 14 34 6 24 6Z" fill="#E8524A" />
                <path d="M24 6C14 6 9 14 9 22C9 30 14 36 20 38L24 43L28 38C34 36 39 30 39 22C39 14 34 6 24 6Z" fill="url(#heartGrad)" />
                <defs>
                    <linearGradient id="heartGrad" x1="9" y1="6" x2="39" y2="43" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF7B9C" />
                        <stop offset="1" stopColor="#E8524A" />
                    </linearGradient>
                </defs>
                <text x="24" y="26" textAnchor="middle" fontSize="12" fill="white" fontFamily="serif" fontWeight="bold">ds</text>
            </svg>
        ),
    };
    return icons[id] || null;
};

// ────── Category Data ─────────────────────────────────────────────
const CATEGORIES = [
    { id: 'all',        label: 'All',        to: '/menu' },
    { id: 'original',   label: 'Original',   to: '/product/original-dubai-chewy' },
    { id: 'strawberry', label: 'Strawberry', to: '/product/strawberry-dubai-chewy' },
    { id: 'giftbox',    label: 'Gift Box',   to: '/menu' },
    { id: 'new',        label: 'New',        to: '/product/strawberry-dubai-chewy' },
    { id: 'best',       label: 'Best',       to: '/product/original-dubai-chewy' },
    { id: 'shipping',   label: 'Shipping',   to: '/shipping' },
    { id: 'about',      label: 'Our Story',  to: '/story' },
];

// ────── Tab filter ────────────────────────────────────────────────
const TABS = ['All', 'Best', 'New', 'Gift'];

export default function Home() {
    const { addItem, openCart } = useCart();

    // Carousel
    const [currentSlide, setCurrentSlide] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const containerRef = useRef(null);
    const firstSlideRef = useRef(null);
    const isAnimating = useRef(false);

    // Measure container for responsive translateX clamping
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setContainerWidth(el.clientWidth);
            if (firstSlideRef.current) {
                setSlideWidth(firstSlideRef.current.offsetWidth);
            }
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Compute clamped translateX so last slide never shows empty space
    const SLIDE_GAP = 16;
    const PAD_X = 64; // px-8 * 2
    const currentSlideWidth = slideWidth || containerWidth * 0.75; // fallback
    const visibleWidth = containerWidth - PAD_X;
    const totalTrackWidth = BANNERS.length * currentSlideWidth + (BANNERS.length - 1) * SLIDE_GAP;
    const maxTranslate = Math.max(0, totalTrackWidth - visibleWidth);
    const targetTranslate = currentSlide * (currentSlideWidth + SLIDE_GAP);
    const translateX = -Math.min(targetTranslate, maxTranslate);

    const goToSlide = (index) => { setCurrentSlide(index); };
    const scrollPrev = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrentSlide(prev => (prev - 1 + BANNERS.length) % BANNERS.length);
        setTimeout(() => { isAnimating.current = false; }, 500);
    };
    const scrollNext = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrentSlide(prev => (prev + 1) % BANNERS.length);
        setTimeout(() => { isAnimating.current = false; }, 500);
    };

    // Auto-advance (starts after 4s)
    useEffect(() => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (!isAnimating.current) {
                    setCurrentSlide(prev => (prev + 1) % BANNERS.length);
                }
            }, 4000);
            return () => clearInterval(interval);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // Products helpers
    const handleAdd = (product) => {
        addItem(product, product.variants[0], 1);
        openCart();
    };
    const handleAddVariant = (product, variantIdx) => {
        addItem(product, product.variants[variantIdx], 1);
        openCart();
    };

    const [activeTab, setActiveTab] = useState('All');

    return (
        <div className="max-w-6xl mx-auto pb-24 font-body scroll-smooth bg-background-light dark:bg-background-dark">

            {/* ───── Tab Navigation Bar ───── */}
            <nav className="sticky top-0 z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-secondary/10 dark:border-white/10 px-4">
                <div className="flex gap-1 overflow-x-auto hide-scrollbar py-0.5">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`shrink-0 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                                activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-light/50 dark:text-text-dark/50 hover:text-primary'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* ───── Multi-Slide Carousel ───── */}
            <section className="relative w-full py-3">
                {/* Outer clip — attach ref here for ResizeObserver */}
                <div ref={containerRef} className="overflow-hidden px-8">
                    {/* Track: clamped translateX prevents empty right on last slide */}
                    <div
                        className="flex gap-4"
                        style={{
                            transform: containerWidth ? `translateX(${translateX}px)` : 'none',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        {BANNERS.map((b, i) => (
                            <div
                                key={b.id}
                                ref={i === 0 ? firstSlideRef : null}
                                className="shrink-0 relative overflow-hidden rounded-2xl shadow-md"
                                style={{
                                    width: 'calc(75vw)',
                                    maxWidth: 700,
                                    minWidth: 280,
                                    aspectRatio: '2.2/1',
                                }}
                            >
                                <img
                                    src={b.image}
                                    alt={`Banner ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: b.objectPosition || 'center center' }}
                                    draggable="false"
                                />
                                {/* CTA overlay */}
                                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-12 bg-gradient-to-t from-black/55 to-transparent flex items-end">
                                    <Link
                                        to={b.to}
                                        className="inline-block px-4 py-1.5 rounded-full text-white text-[11px] lg:text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-sm bg-black/30 border border-white/30 hover:bg-white/20 transition-all"
                                    >
                                        {b.cta} →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-[45%] -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-black/60 hover:bg-white rounded-full flex items-center justify-center text-primary shadow-md transition-all z-10 backdrop-blur-sm"
                    aria-label="Previous"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-2 top-[45%] -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-black/60 hover:bg-white rounded-full flex items-center justify-center text-primary shadow-md transition-all z-10 backdrop-blur-sm"
                    aria-label="Next"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-3">
                    {BANNERS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`rounded-full transition-all ${
                                i === currentSlide
                                    ? 'w-5 h-1.5 bg-primary'
                                    : 'w-1.5 h-1.5 bg-primary/25'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* ───── Category Icon Grid ───── */}
            <section className="px-4 py-5 border-b border-secondary/10 dark:border-white/10">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
                    {CATEGORIES.map(cat => (
                        <Link
                            key={cat.id}
                            to={cat.to}
                            className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-primary/5 transition-colors group"
                        >
                            {/* Rounded square background */}
                            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white dark:bg-surface-dark rounded-2xl flex items-center justify-center shadow-soft border border-secondary/10 dark:border-white/10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <CategoryIcon id={cat.id} />
                            </div>
                            <span className="text-[9px] lg:text-[11px] font-bold text-text-light/70 dark:text-text-dark/70 text-center leading-tight">{cat.label}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ───── Best Sellers ───── */}
            <section className="px-4 py-8">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl lg:text-3xl font-display font-bold text-primary dark:text-white flex items-center gap-2">
                        <CategoryIcon id="best" /><span>Best Sellers</span>
                    </h2>
                    <Link to="/menu" className="text-[10px] lg:text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                        See All <ChevronRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {PRODUCTS.map(p => (
                        <div key={p.id} className="bg-surface-light dark:bg-surface-dark rounded-[1.75rem] p-4 shadow-soft border border-secondary/10 dark:border-white/5 flex flex-col relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-full text-secondary hover:text-red-400 transition-colors shadow-sm">
                                <Heart size={14} />
                            </button>

                            <Link to={`/product/${p.id}`} className="block">
                                <div className="aspect-square rounded-2xl bg-background-light dark:bg-background-dark mb-3 overflow-hidden relative">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-2 left-2 bg-white/95 dark:bg-black/80 px-2 py-1 rounded-lg text-[9px] font-bold text-primary dark:text-accent backdrop-blur-sm flex items-center gap-1 shadow-sm">
                                        <Star size={10} fill="currentColor" /> 4.9
                                    </div>
                                    {p.tags?.includes('Fan Favorite') && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">NEW</div>
                                    )}
                                </div>
                            </Link>

                            <div className="flex-grow px-0.5">
                                <h3 className="font-display font-bold text-sm lg:text-base mb-0.5 line-clamp-2 text-text-light dark:text-text-dark leading-snug">{p.title}</h3>
                                <p className="text-[9px] opacity-50 uppercase tracking-widest font-bold text-secondary mb-3">{p.subtitle || 'Freshly Made'}</p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-secondary/10 dark:border-white/10 px-0.5">
                                <span className="font-bold text-primary dark:text-white text-base">${p.variants[0].price.toFixed(2)}</span>
                                <button
                                    onClick={() => handleAdd(p)}
                                    className="h-9 w-9 bg-accent text-white rounded-xl flex items-center justify-center hover:bg-primary transition-all shadow-md active:scale-90"
                                    aria-label={`Add ${p.title} to cart`}
                                >
                                    <ShoppingBag size={17} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───── Promo Strip ───── */}
            <section className="px-4 py-2">
                <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/15 px-5 py-4 flex items-center gap-4">
                    <span className="text-3xl shrink-0">🍪</span>
                    <div>
                        <p className="font-display font-bold text-primary dark:text-white text-sm lg:text-base">Handcrafted in Small Batches</p>
                        <p className="text-[10px] lg:text-xs text-text-light/60 dark:text-text-dark/60">Premium ingredients • No MSG • Ships fresh nationwide</p>
                    </div>
                    <Truck size={20} className="text-primary/40 ml-auto shrink-0 hidden sm:block" />
                </div>
            </section>

            {/* ───── Gift Sets ───── */}
            <section className="px-4 py-8">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl lg:text-3xl font-display font-bold text-primary dark:text-white flex items-center gap-2">
                        <Gift size={22} className="text-accent" /> Gift Sets
                    </h2>
                    <Link to="/menu" className="text-[10px] lg:text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                        See All <ChevronRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PRODUCTS.flatMap(p =>
                        p.variants.slice(1).map(v => ({ product: p, variant: v, variantIdx: p.variants.indexOf(v) }))
                    ).map(({ product, variant, variantIdx }) => (
                        <div key={`${product.id}-${variant.id}`} className="bg-surface-light dark:bg-surface-dark rounded-[1.75rem] overflow-hidden shadow-soft border border-secondary/10 dark:border-white/5 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <Link to={`/product/${product.id}`} className="block">
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={`${product.title} ${variant.label}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-black/75 px-2.5 py-1 rounded-full text-[9px] font-black text-primary dark:text-accent uppercase tracking-wider backdrop-blur-sm shadow-sm">
                                        {variant.label}
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-display font-bold text-sm line-clamp-1 text-text-light dark:text-text-dark mb-0.5">{product.title}</h3>
                                <p className="text-[9px] opacity-50 uppercase tracking-widest font-bold text-secondary mb-3">{variant.label}</p>

                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-secondary/10 dark:border-white/10">
                                    <span className="font-bold text-primary dark:text-white">${variant.price.toFixed(2)}</span>
                                    <button
                                        onClick={() => handleAddVariant(product, variantIdx)}
                                        className="h-9 px-3 bg-primary text-white rounded-xl flex items-center gap-1.5 text-[10px] font-bold hover:bg-accent transition-all shadow-md active:scale-90"
                                    >
                                        <ShoppingBag size={13} /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───── CTA Banner ───── */}
            <section className="px-4 pb-6">
                <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-12 text-center">
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                    <span className="text-4xl">🎁</span>
                    <h3 className="mt-3 text-2xl lg:text-4xl font-display font-black text-white leading-tight">Freshly Made for You</h3>
                    <p className="mt-2 text-white/70 text-xs lg:text-sm max-w-sm mx-auto leading-relaxed">
                        Handcrafted Dubai Chewy Cookies. Premium ingredients, shipped with love.
                    </p>
                    <Link
                        to="/menu"
                        className="inline-block mt-6 bg-white text-primary text-xs font-black uppercase tracking-[0.2em] px-8 py-3.5 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                    >
                        Explore Shop
                    </Link>
                </div>
            </section>

            {/* ───── Mobile Tab Bar ───── */}
            <nav className="fixed bottom-0 left-0 right-0 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-secondary/20 dark:border-white/10 z-50 pb-safe pt-2">
                <div className="max-w-md mx-auto flex justify-around items-center h-16">
                    <Link to="/" className="flex flex-col items-center justify-center w-16 h-full text-primary">
                        <Star size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>
                    <Link to="/menu" className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <ShoppingBag size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Shop</span>
                    </Link>
                    <button className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <Heart size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Saved</span>
                    </button>
                    <Link to="/profile" className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors">
                        <User size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
