import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { UPCOMING } from '../data/upcoming';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Star, Heart, ChevronRight, User, ChevronLeft, Gift, Truck } from 'lucide-react';

// ────── Banner Data ──────────────────────────────────────────────
const BANNERS = [
    {
        id: 1,
        image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221042_3b57c250-39db-48c8-b7c8-5f4c41c760c4.png', // Original Dubai Chewy Cookie (Higgsfield, premium restyle)
        objectPosition: 'center center',
        cta: 'Order Now',
        to: '/product/original-dubai-chewy',
    },
    {
        id: 2,
        image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221048_4404410d-823d-4349-9c1a-74784259504d.png', // Strawberry Dubai Chewy Cookie (Higgsfield, premium restyle)
        objectPosition: 'center center',
        cta: 'Try It',
        to: '/product/strawberry-dubai-chewy',
    },
    {
        id: 3,
        image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221054_3e1d10aa-5293-4e12-8f6f-7191b48120bb.png', // Gift assortment (Higgsfield, premium restyle)
        objectPosition: 'center center',
        cta: 'Shop Gift Sets',
        to: '/menu',
    },
    {
        id: 4,
        image: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221058_9f186d5c-30bc-4905-9ab0-26b777712539.png', // M&M Chocolate Bagel (Higgsfield, premium restyle)
        objectPosition: 'center center',
        cta: 'Taste the Magic',
        to: '/product/mm-chocolate-bagel',
    },
];

// ────── Category Line Icons (premium, single-color) ───────────────
const CategoryIcon = ({ id }) => {
    const stroke = "#B68D40";
    const common = { viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", className: "w-6 h-6" };
    const icons = {
        all: (
            <svg {...common}>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
            </svg>
        ),
        original: (
            <svg {...common}>
                <circle cx="12" cy="12" r="8.5" />
                <circle cx="9" cy="10" r="0.9" fill={stroke} stroke="none" />
                <circle cx="14.5" cy="9.5" r="0.7" fill={stroke} stroke="none" />
                <circle cx="15" cy="14" r="0.9" fill={stroke} stroke="none" />
                <circle cx="10" cy="15" r="0.7" fill={stroke} stroke="none" />
            </svg>
        ),
        strawberry: (
            <svg {...common}>
                <path d="M12 8c-4 0-6.5 3.5-6.5 7.5S9 21 12 21s6.5-1.5 6.5-5.5S16 8 12 8Z" />
                <path d="M12 8c-1.5-2-3.5-2.3-4.5-1" />
                <path d="M12 8c0-2.3-1.5-3-2.8-2.2" />
                <path d="M12 8c1.5-2 3.5-2.3 4.5-1" />
            </svg>
        ),
        giftbox: (
            <svg {...common}>
                <rect x="4" y="10" width="16" height="10" rx="1" />
                <path d="M4 14h16" />
                <path d="M12 10v10" />
                <path d="M12 10c-1.5-3-3.5-4-4.5-2.5S9 10 12 10Z" />
                <path d="M12 10c1.5-3 3.5-4 4.5-2.5S15 10 12 10Z" />
            </svg>
        ),
        new: (
            <svg {...common}>
                <path d="M12 4c.4 2.6 1 4.2 2 5.2S17 11 19 12c-2 .8-3.9 1.6-5 2.8s-1.6 2.6-2 5.2c-.4-2.6-1-4.2-2-5.2S6 13.8 4 13c2-.8 3.9-1.6 5-2.8S10.6 6.6 12 4Z" />
            </svg>
        ),
        best: (
            <svg {...common}>
                <path d="M12 3.5l2.3 4.9 5.2.7-3.8 3.7.9 5.3L12 15.6l-4.6 2.5.9-5.3-3.8-3.7 5.2-.7Z" />
            </svg>
        ),
        shipping: (
            <svg {...common}>
                <rect x="2.5" y="8" width="12" height="8" rx="1" />
                <path d="M14.5 11h3.7l3.3 3v4h-7Z" />
                <circle cx="7" cy="18.5" r="1.6" />
                <circle cx="17" cy="18.5" r="1.6" />
            </svg>
        ),
        about: (
            <svg {...common}>
                <path d="M5 4.5h11a2 2 0 0 1 2 2V19a1.5 1.5 0 0 1-1.5 1.5H7A2.5 2.5 0 0 1 4.5 18V6.5A2 2 0 0 1 5 4.5Z" />
                <path d="M8 9h7M8 12.5h7M8 16h4" />
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
    { id: 'giftbox',    label: 'Gift Box',   to: '/menu?filter=gift' },
    { id: 'new',        label: 'New',        to: '/menu?filter=new' },
    { id: 'best',       label: 'Best',       to: '/menu?filter=best' },
    { id: 'shipping',   label: 'Shipping',   to: '/shipping' },
    { id: 'about',      label: 'Our Story',  to: '/story' },
];

// ────── Tab filter ────────────────────────────────────────────────
const TABS = ['All', 'Best', 'New', 'Gift'];

export default function Home() {
    const { addItem, openCart } = useCart();
    const { user, signOut, openLogin } = useAuth();

    // Check for checkout success and trigger Google Customer Reviews Opt-in
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const sessionId = urlParams.get('session_id');

        if (success === 'true' && sessionId) {
            // Clean up the URL to prevent re-triggering upon refresh
            window.history.replaceState({}, document.title, window.location.pathname);

            fetch('/api/get-checkout-session', {
                method: 'POST', // using POST to send JSON body
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            })
            .then(res => res.json())
            .then(data => {
                if (data.email && data.order_id) {
                    window.renderOptIn = function() {
                        window.gapi.load('surveyoptin', function() {
                            window.gapi.surveyoptin.render({
                                "merchant_id": 5710997340,
                                "order_id": data.order_id,
                                "email": data.email,
                                "delivery_country": data.delivery_country,
                                "estimated_delivery_date": data.estimated_delivery_date
                            });
                        });
                    };

                    const script = document.createElement('script');
                    script.src = "https://apis.google.com/js/platform.js?onload=renderOptIn";
                    script.async = true;
                    script.defer = true;
                    document.body.appendChild(script);
                }
            })
            .catch(console.error);
        }
    }, []);

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

    const getFilteredProducts = () => {
        if (activeTab === 'Best') return PRODUCTS.filter(p => p.tags?.includes('Best Seller'));
        if (activeTab === 'New') return PRODUCTS.filter(p => p.tags?.includes('Fan Favorite') || p.tags?.includes('New'));
        if (activeTab === 'Gift') return PRODUCTS.filter(p => p.variants?.some(v => v.label.includes('Box')));
        return PRODUCTS;
    };
    const displayedProducts = getFilteredProducts();

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
                                        className="inline-block px-4 py-1.5 rounded-sm text-white text-[11px] lg:text-xs font-semibold uppercase tracking-wider shadow-xl backdrop-blur-sm bg-black/30 border border-white/40 hover:bg-white/15 transition-all"
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
                            {/* Circle background */}
                            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center border border-secondary/25 dark:border-white/10 group-hover:border-secondary/60 transition-colors">
                                <CategoryIcon id={cat.id} />
                            </div>
                            <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider text-text-light/70 dark:text-text-dark/70 text-center leading-tight">{cat.label}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ───── Best Sellers / Top Picks / New Arrivals ───── */}
            <section className="px-4 py-8">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl lg:text-3xl font-display font-bold text-primary dark:text-white flex items-center gap-2">
                        {activeTab === 'All' && <><CategoryIcon id="all" /><span>Explore</span></>}
                        {activeTab === 'Best' && <><CategoryIcon id="best" /><span>Best Sellers</span></>}
                        {activeTab === 'New' && <><CategoryIcon id="new" /><span>New Arrivals</span></>}
                        {activeTab === 'Gift' && <><CategoryIcon id="giftbox" /><span>Gift Sets</span></>}
                    </h2>
                    <Link to="/menu" className="text-[10px] lg:text-xs font-bold text-accent hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                        See All <ChevronRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {displayedProducts.map(p => (
                        <div key={p.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-soft border border-secondary/10 dark:border-white/5 flex flex-col relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded">NEW</div>
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

                    {activeTab === 'All' && UPCOMING.map(u => (
                        <div key={u.id} className="bg-surface-light/60 dark:bg-surface-dark/60 rounded-xl p-4 border-2 border-dashed border-secondary/30 flex flex-col relative">
                            <div className="aspect-square rounded-2xl bg-background-light dark:bg-background-dark mb-3 overflow-hidden relative">
                                {u.image ? (
                                    <img src={u.image} alt={u.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="font-display italic text-text-light/40 dark:text-text-dark/40 text-xs text-center px-4">Photo coming soon</span>
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Coming Soon</div>
                            </div>
                            <div className="flex-grow px-0.5">
                                <h3 className="font-display font-bold text-sm lg:text-base mb-0.5 text-text-light dark:text-text-dark leading-snug">{u.title}</h3>
                                <p className="text-[9px] opacity-60 uppercase tracking-widest font-bold text-secondary mb-3">{u.composition}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-secondary/10 dark:border-white/10 px-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Notify Me</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───── Promo Strip ───── */}
            <section className="px-4 py-2">
                <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/15 px-5 py-4 flex items-center gap-4">
                    <span className="text-2xl shrink-0 text-secondary">✦</span>
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
                        <div key={`${product.id}-${variant.id}`} className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-soft border border-secondary/10 dark:border-white/5 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <Link to={`/product/${product.id}`} className="block">
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={`${product.title} ${variant.label}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-black/75 px-2.5 py-1 rounded text-[9px] font-black text-primary dark:text-accent uppercase tracking-wider backdrop-blur-sm shadow-sm">
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
                <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-12 text-center">
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
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-secondary/20 dark:border-white/10 z-50 pb-safe pt-2">
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
                    <button
                        onClick={user ? signOut : openLogin}
                        className="flex flex-col items-center justify-center w-16 h-full text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors"
                    >
                        <User size={22} className="mb-1" />
                        <span className="text-[10px] font-bold">{user ? 'Sign Out' : 'Sign In'}</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
