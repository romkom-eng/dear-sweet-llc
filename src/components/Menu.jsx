import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search } from 'lucide-react';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

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
        <div style={{ fontFamily: sans, background: '#FDF6EC', minHeight: '100vh' }}>

            {/* Page Header */}
            <div style={{ background: '#2C1810', padding: '72px 24px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)', marginBottom: 16 }}>Our Selection</div>
                <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#C9A96E', margin: '0 0 20px', fontWeight: 600 }}>The Collection</h1>
                <p style={{ color: 'rgba(253,246,236,0.6)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>
                    Every cookie is handcrafted to order with premium Dubai chocolate, pistachio & kunafa pastry.
                </p>
            </div>

            {/* Search */}
            <div style={{ background: '#2C1810', paddingBottom: 28, display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 440, padding: '0 24px' }}>
                    <Search size={16} style={{ position: 'absolute', left: 38, top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,169,110,0.5)' }} />
                    <input
                        type="text" placeholder="Search cookies..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', background: 'rgba(253,246,236,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 4, padding: '12px 16px 12px 40px', color: '#FDF6EC', fontSize: '0.85rem', outline: 'none', fontFamily: sans, boxSizing: 'border-box' }}
                    />
                </div>
            </div>

            {/* Products */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 96px' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ color: '#a07840' }}>No cookies found for "{search}"</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
                        {filtered.map(p => (
                            <div key={p.id} style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', border: '1px solid #e8d8ca', transition: 'transform 0.25s, box-shadow 0.25s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(44,24,16,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

                                <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                    <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#f5ecd8', position: 'relative' }}>
                                        <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                            onMouseLeave={e => e.target.style.transform = 'none'} />
                                        {p.tags[0] && (
                                            <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(44,24,16,0.85)', color: '#C9A96E', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>
                                                {p.tags[0]}
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div style={{ padding: '20px 20px 16px' }}>
                                    {p.subtitle && <div style={{ fontSize: '0.62rem', color: '#C9A96E', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{p.subtitle}</div>}
                                    <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                                        <h3 style={{ fontFamily: serif, fontSize: '1.2rem', color: '#2C1810', margin: '0 0 6px', fontWeight: 500 }}>{p.title}</h3>
                                    </Link>
                                    <p style={{ fontSize: '0.78rem', color: '#6b4c35', lineHeight: 1.6, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {p.description}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, color: '#a07840', fontSize: '1.1rem' }}>from ${p.price}</span>
                                        <button onClick={() => handleAdd(p)} style={{
                                            background: '#2C1810', color: '#C9A96E', border: 'none',
                                            borderRadius: 2, padding: '9px 18px', fontSize: '0.72rem',
                                            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                            cursor: 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', gap: 6,
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#1a0e09'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#2C1810'}>
                                            <ShoppingBag size={13} /> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
