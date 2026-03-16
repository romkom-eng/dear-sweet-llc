import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowRight, Star, ShoppingBag, ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&q=85&auto=format';

const features = [
    { icon: '🫶', title: 'Handcrafted Daily', desc: 'Every cookie baked fresh to order with premium ingredients.' },
    { icon: '🌰', title: 'Real Pistachio', desc: 'Sourced from premium Middle Eastern pistachio farms.' },
    { icon: '✨', title: 'Authentic Kunafa', desc: 'Traditional kataifi pastry woven into every bite.' },
    { icon: '📦', title: 'Gift-Ready', desc: 'Beautifully packaged for gifting or self-indulgence.' },
];

const reviews = [
    { name: 'Ji-yeon K.', rating: 5, text: '정말 최고에요. 두바이 초콜릿 특유의 식감이 살아있고 선물용으로 완벽해요.' },
    { name: 'Sarah M.', rating: 5, text: 'These are absolutely incredible. The pistachio filling is unreal.' },
    { name: 'Tom H.', rating: 5, text: 'Ordered twice already. Premium quality and beautiful packaging.' },
];

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

const featured = PRODUCTS.slice(0, 3);

export default function Home() {
    const { addItem, openCart } = useCart();

    const handleAdd = (product) => {
        addItem(product, product.variants[0], 1);
        openCart();
    };

    return (
        <div style={{ fontFamily: sans }}>

            {/* ─── HERO ─── */}
            <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={HERO_IMG} alt="Original Dubai Chewy Cookie - Premium Handmade Bakery by Dear Sweet LLC" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,14,9,0.75) 0%, rgba(44,24,16,0.65) 60%, rgba(26,14,9,0.85) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 800 }}>
                    <div style={{ display: 'inline-block', border: '1px solid rgba(201,169,110,0.5)', color: '#C9A96E', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 2, marginBottom: 28 }}>
                        Premium Artisanal
                    </div>
                    <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 600, color: '#FDF6EC', lineHeight: 1.05, marginBottom: 24 }}>
                        The Original<br />
                        <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>Dubai Chewy Cookie</span>
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'rgba(253,246,236,0.75)', lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
                        Handcrafted with premium pistachio, kunafa & authentic Dubai chocolate. Each bite is a journey.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/menu" style={{
                            background: '#C9A96E', color: '#2C1810', textDecoration: 'none',
                            padding: '14px 36px', borderRadius: 2, fontWeight: 700,
                            fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            Shop Now <ArrowRight size={16} />
                        </Link>
                        <Link to="/order" style={{
                            background: 'rgba(253,246,236,0.1)', color: '#FDF6EC', textDecoration: 'none',
                            padding: '14px 36px', borderRadius: 2, fontWeight: 600,
                            fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                            border: '1px solid rgba(201,169,110,0.5)',
                        }}>
                            Order Inquiry
                        </Link>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(201,169,110,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
                    <ChevronDown size={16} style={{ animation: 'bounce 2s infinite' }} />
                </div>
            </section>

            {/* ─── FEATURES STRIP ─── */}
            <section style={{ background: '#2C1810', padding: '48px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
                    {features.map(f => (
                        <div key={f.title} style={{ textAlign: 'center', padding: '8px 16px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
                            <div style={{ fontFamily: serif, fontSize: '1.15rem', color: '#C9A96E', fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
                            <p style={{ fontSize: '0.82rem', color: 'rgba(253,246,236,0.6)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURED PRODUCTS ─── */}
            <section style={{ background: '#FDF6EC', padding: '96px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>Our Selection</div>
                        <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C1810', margin: 0, fontWeight: 600 }}>Signature Cookies</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
                        {featured.map(p => (
                            <div key={p.id} style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', border: '1px solid #e8d8ca', transition: 'transform 0.25s, box-shadow 0.25s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(44,24,16,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#f5ecd8' }}>
                                        <img src={p.image} alt={`${p.title} - Authentic Dubai Chewy Cookie`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                            onMouseLeave={e => e.target.style.transform = 'none'} />
                                    </div>
                                </Link>
                                <div style={{ padding: '24px 24px 20px' }}>
                                    {p.subtitle && <div style={{ fontSize: '0.65rem', color: '#C9A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{p.subtitle}</div>}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <h3 style={{ fontFamily: serif, fontSize: '1.2rem', color: '#2C1810', margin: 0, fontWeight: 500, flex: 1, paddingRight: 12 }}>{p.title}</h3>
                                        <span style={{ fontWeight: 700, color: '#a07840', fontSize: '1rem', whiteSpace: 'nowrap' }}>from ${p.price}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#6b4c35', lineHeight: 1.6, margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {p.description}
                                    </p>
                                    <button onClick={() => handleAdd(p)} style={{
                                        width: '100%', background: '#2C1810', color: '#C9A96E', border: 'none',
                                        borderRadius: 2, padding: '11px', fontSize: '0.75rem', fontWeight: 700,
                                        letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: sans,
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#1a0e09'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#2C1810'}>
                                        <ShoppingBag size={15} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                        <Link to="/menu" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            color: '#2C1810', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            borderBottom: '2px solid #C9A96E', paddingBottom: 4,
                        }}>
                            View Full Collection <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── ABOUT SPLIT ─── */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }} className="about-split">
                <div style={{ background: '#2C1810', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px' }}>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)', marginBottom: 20 }}>Our Promise</div>
                    <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#C9A96E', lineHeight: 1.15, marginBottom: 24, fontWeight: 600 }}>
                        Authentic Dubai<br />Flavors, Delivered
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(253,246,236,0.7)', lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
                        Every single cookie starts with imported kunafa pastry, hand-layered with premium pistachio cream. No shortcuts. No artificial flavors. Just the real Dubai experience.
                    </p>
                    <Link to="/story" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        color: '#C9A96E', textDecoration: 'none', fontWeight: 600,
                        fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(201,169,110,0.4)', paddingBottom: 4, width: 'fit-content',
                    }}>
                        Read Our Story <ArrowRight size={14} />
                    </Link>
                </div>
                <div style={{ overflow: 'hidden', background: '#1a0e09' }}>
                    <img src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&q=80&auto=format" alt="Handmade Dubai Chewy Cookie Preparation - Dear Sweet LLC" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                </div>
            </section>

            {/* ─── REVIEWS ─── */}
            <section style={{ background: '#f5ecd8', padding: '96px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>Customer Love</div>
                        <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#2C1810', margin: 0, fontWeight: 600 }}>What People Say</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                        {reviews.map(r => (
                            <div key={r.name} style={{ background: '#fff', borderRadius: 4, padding: '32px 28px', border: '1px solid #e8d8ca' }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                                    {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="#C9A96E" color="#C9A96E" />)}
                                </div>
                                <p style={{ fontSize: '0.88rem', color: '#3d2419', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{r.text}"</p>
                                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a07840' }}>— {r.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA BANNER ─── */}
            <section style={{ background: '#C9A96E', padding: '80px 24px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C1810', marginBottom: 16, fontWeight: 700 }}>Ready to indulge?</h2>
                <p style={{ color: 'rgba(44,24,16,0.7)', marginBottom: 36, fontSize: '0.95rem' }}>Order today and experience Dubai in every bite.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/menu" style={{
                        background: '#2C1810', color: '#C9A96E', textDecoration: 'none',
                        padding: '15px 44px', borderRadius: 2, fontWeight: 700,
                        fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        Shop Now <ArrowRight size={16} />
                    </Link>
                    <Link to="/order" style={{
                        background: 'transparent', color: '#2C1810', textDecoration: 'none',
                        padding: '15px 44px', borderRadius: 2, fontWeight: 700,
                        fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        border: '2px solid #2C1810', display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        Bulk Order Inquiry
                    </Link>
                </div>
            </section>

            <style>{`
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
                @media (max-width: 768px) { .about-split { grid-template-columns: 1fr !important; } }
            `}</style>
        </div>
    );
}
