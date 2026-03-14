import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, ExternalLink } from 'lucide-react';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

export default function ProductDetail() {
    const { id } = useParams();
    const product = getProductById(id);
    const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const { addItem, openCart } = useCart();

    if (!product) return (
        <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sans, gap: 16 }}>
            <div style={{ fontSize: '3rem' }}>🍪</div>
            <p style={{ color: '#a07840' }}>Product not found.</p>
            <Link to="/menu" style={{ color: '#2C1810', fontWeight: 600 }}>← Back to Shop</Link>
        </div>
    );

    const handleAdd = () => {
        addItem(product, selectedVariant, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
        openCart();
    };

    // If there's a Stripe link, open it directly
    const handleBuyNow = () => {
        if (selectedVariant?.stripeLink || product.stripeLink) {
            window.open(selectedVariant?.stripeLink || product.stripeLink, '_blank');
        } else {
            handleAdd();
        }
    };

    return (
        <div style={{ fontFamily: sans, background: '#FDF6EC', minHeight: '100vh' }}>

            {/* Breadcrumb */}
            <div style={{ background: '#2C1810', padding: '14px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Link to="/menu" style={{ color: 'rgba(201,169,110,0.6)', textDecoration: 'none', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <ArrowLeft size={14} /> Shop
                    </Link>
                    <span style={{ color: 'rgba(201,169,110,0.3)' }}>/</span>
                    <span style={{ color: '#C9A96E', fontSize: '0.78rem' }}>{product.title}</span>
                </div>
            </div>

            {/* Product */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 96px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="product-detail-grid">

                    {/* Image */}
                    <div style={{ borderRadius: 4, overflow: 'hidden', background: '#f5ecd8', aspectRatio: '1' }}>
                        <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info */}
                    <div>
                        {product.subtitle && <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>{product.subtitle}</div>}
                        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#2C1810', margin: '0 0 16px', fontWeight: 600, lineHeight: 1.1 }}>{product.title}</h1>

                        {/* Price */}
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#a07840', marginBottom: 28 }}>
                            ${selectedVariant ? selectedVariant.price.toFixed(2) : product.price.toFixed(2)}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #e8d8ca' }}>
                            {product.tags.map(t => (
                                <span key={t} style={{ background: '#f5ecd8', color: '#6b4c35', fontSize: '0.7rem', letterSpacing: '0.08em', padding: '4px 12px', borderRadius: 20, border: '1px solid #e8d8ca' }}>{t}</span>
                            ))}
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '0.9rem', color: '#6b4c35', lineHeight: 1.85, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #e8d8ca' }}>
                            {product.description}
                        </p>

                        {/* Variant Selector */}
                        {product.variants.length > 1 && (
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2C1810', fontWeight: 600, marginBottom: 12 }}>Select Size</div>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {product.variants.map(v => (
                                        <button key={v.id} onClick={() => setSelectedVariant(v)} style={{
                                            padding: '10px 18px', borderRadius: 2, cursor: 'pointer', fontFamily: sans,
                                            fontSize: '0.85rem', fontWeight: 500,
                                            background: selectedVariant?.id === v.id ? '#2C1810' : '#fff',
                                            color: selectedVariant?.id === v.id ? '#C9A96E' : '#2C1810',
                                            border: `1px solid ${selectedVariant?.id === v.id ? '#2C1810' : '#e8d8ca'}`,
                                            transition: 'all 0.15s',
                                        }}>
                                            {v.label} — ${v.price.toFixed(2)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2C1810', fontWeight: 600, marginBottom: 12 }}>Quantity</div>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8d8ca', borderRadius: 2, width: 'fit-content' }}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 42, height: 42, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2C1810', fontFamily: sans }}>−</button>
                                <span style={{ width: 42, textAlign: 'center', fontWeight: 600, color: '#2C1810' }}>{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} style={{ width: 42, height: 42, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2C1810', fontFamily: sans }}>+</button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button onClick={handleAdd} style={{
                                width: '100%', background: added ? '#2C1810' : '#C9A96E', color: added ? '#C9A96E' : '#2C1810',
                                border: 'none', borderRadius: 2, padding: '16px', fontSize: '0.82rem',
                                fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                                cursor: 'pointer', fontFamily: sans,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                transition: 'background 0.3s',
                            }}>
                                <ShoppingBag size={18} />
                                {added ? '✓ Added to Cart!' : `Add to Cart — $${((selectedVariant?.price || product.price) * qty).toFixed(2)}`}
                            </button>

                            {/* Stripe Buy Now (shows if stripeLink is set) */}
                            {(product.stripeLink || selectedVariant?.stripeLink) && (
                                <button onClick={handleBuyNow} style={{
                                    width: '100%', background: '#635BFF', color: '#fff',
                                    border: 'none', borderRadius: 2, padding: '14px', fontSize: '0.82rem',
                                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                    cursor: 'pointer', fontFamily: sans,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                }}>
                                    <ExternalLink size={16} /> Buy Now via Stripe
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) { .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
            `}</style>
        </div>
    );
}
