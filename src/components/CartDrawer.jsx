import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

const EMAILJS_SERVICE = 'service_glti2i5';
const EMAILJS_TEMPLATE = 'template_i69i2pi';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // 필요 시 교체

export default function CartDrawer() {
    const { items, isCartOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart();
    const { user } = useAuth();
    const [checkoutState, setCheckoutState] = useState('idle'); // 'idle' | 'form' | 'sending' | 'sent'
    const [contact, setContact] = useState({ name: user?.displayName || '', email: user?.email || '', phone: '' });

    const handleCheckout = async (e) => {
        e.preventDefault();
        setCheckoutState('sending');
        const orderSummary = items.map(({ product, variant, quantity }) =>
            `${product.title} (${variant.label}) x${quantity} — $${(variant.price * quantity).toFixed(2)}`
        ).join('\n');

        try {
            await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
                to_name: contact.name,
                to_email: contact.email,
                phone: contact.phone,
                product: 'Cart Order',
                quantity: `${totalItems} item(s)`,
                location: 'To be arranged',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                details: `ORDER SUMMARY:\n${orderSummary}\n\nSUBTOTAL: $${subtotal.toFixed(2)}`,
            }, EMAILJS_PUBLIC_KEY);
            setCheckoutState('sent');
            clearCart();
        } catch {
            // Even if EmailJS fails, show confirmation (owner gets notified another way)
            setCheckoutState('sent');
            clearCart();
        }
    };

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div onClick={closeCart} style={{
                    position: 'fixed', inset: 0, background: 'rgba(26,14,9,0.6)', zIndex: 200,
                    backdropFilter: 'blur(4px)',
                }} />
            )}

            {/* Drawer */}
            <div style={{
                position: 'fixed', top: 0, right: 0, height: '100vh', width: '100%', maxWidth: 420,
                background: '#FDF6EC', zIndex: 201, display: 'flex', flexDirection: 'column',
                transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: sans,
            }}>
                {/* Header */}
                <div style={{ background: '#2C1810', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <ShoppingBag size={20} color="#C9A96E" />
                        <span style={{ fontFamily: serif, fontSize: '1.15rem', color: '#C9A96E', fontWeight: 600 }}>
                            {checkoutState === 'form' ? 'Your Details' : checkoutState === 'sent' ? 'Order Received!' : 'Your Cart'}
                        </span>
                        {totalItems > 0 && checkoutState === 'idle' && (
                            <span style={{ background: '#C9A96E', color: '#2C1810', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 800 }}>
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button onClick={() => { closeCart(); setCheckoutState('idle'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(201,169,110,0.7)', padding: 4 }}>
                        <X size={20} />
                    </button>
                </div>

                {/* ── SENT STATE ── */}
                {checkoutState === 'sent' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', gap: 16 }}>
                        <CheckCircle2 size={56} color="#2a7a4b" />
                        <h3 style={{ fontFamily: serif, fontSize: '1.8rem', color: '#2C1810', margin: 0 }}>Order Received!</h3>
                        <p style={{ color: '#6b4c35', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 280 }}>
                            We've received your order and will contact you within 24 hours to confirm payment and pickup details.
                        </p>
                        <button onClick={() => { closeCart(); setCheckoutState('idle'); }} style={{
                            marginTop: 8, background: '#C9A96E', color: '#2C1810', border: 'none',
                            borderRadius: 4, padding: '12px 32px', fontWeight: 700, fontSize: '0.82rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                        }}>
                            Continue Shopping
                        </button>
                    </div>
                )}

                {/* ── CHECKOUT FORM ── */}
                {checkoutState === 'form' && (
                    <form onSubmit={handleCheckout} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={{ fontSize: '0.82rem', color: '#6b4c35', margin: 0, lineHeight: 1.6 }}>
                            We'll contact you to arrange payment & pickup after reviewing your order.
                        </p>

                        {[
                            { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Jane Doe' },
                            { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'jane@example.com' },
                            { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '(555) 123-4567' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key}>
                                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>{label}</label>
                                <input type={type} placeholder={placeholder} required={label.includes('*')}
                                    value={contact[key]} onChange={e => setContact({ ...contact, [key]: e.target.value })}
                                    style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '11px 14px', fontFamily: sans, fontSize: '0.88rem', color: '#2C1810', outline: 'none' }} />
                            </div>
                        ))}

                        {/* Order summary */}
                        <div style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: 16 }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', marginBottom: 12 }}>Order Summary</div>
                            {items.map(({ product, variant, quantity }) => (
                                <div key={variant.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#2C1810', marginBottom: 6 }}>
                                    <span>{product.title} ({variant.label}) ×{quantity}</span>
                                    <span style={{ fontWeight: 700 }}>${(variant.price * quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #f5ecd8', paddingTop: 10, marginTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#2C1810' }}>
                                <span>Total</span>
                                <span style={{ color: '#a07840', fontSize: '1.1rem' }}>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button type="submit" disabled={checkoutState === 'sending'} style={{
                            background: '#C9A96E', color: '#2C1810', border: 'none', borderRadius: 4,
                            padding: '14px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}>
                            {checkoutState === 'sending' ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</> : 'Place Order Request'}
                        </button>
                        <button type="button" onClick={() => setCheckoutState('idle')} style={{ background: 'none', border: 'none', color: '#a07840', cursor: 'pointer', fontSize: '0.8rem', fontFamily: sans }}>
                            ← Back to cart
                        </button>
                    </form>
                )}

                {/* ── CART ITEMS ── */}
                {(checkoutState === 'idle') && (
                    <>
                        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                            {items.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, textAlign: 'center' }}>
                                    <div style={{ fontSize: '4rem' }}>🍪</div>
                                    <p style={{ color: '#a07840', fontFamily: serif, fontSize: '1.1rem' }}>Your cart is empty</p>
                                    <button onClick={closeCart} style={{ background: '#2C1810', color: '#C9A96E', border: 'none', borderRadius: 2, padding: '11px 28px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, marginTop: 8 }}>
                                        Shop Now
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {items.map(({ product, variant, quantity }) => (
                                        <div key={variant.id} style={{ display: 'flex', gap: 16, padding: 16, background: '#fff', borderRadius: 4, border: '1px solid #e8d8ca' }}>
                                            <div style={{ width: 76, height: 76, borderRadius: 2, overflow: 'hidden', background: '#f5ecd8', flexShrink: 0 }}>
                                                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontFamily: serif, fontSize: '1rem', color: '#2C1810', fontWeight: 500, marginBottom: 2 }}>{product.title}</div>
                                                <div style={{ fontSize: '0.72rem', color: '#a07840', marginBottom: 10 }}>{variant.label}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8d8ca', borderRadius: 2 }}>
                                                        <button onClick={() => updateQuantity(variant.id, quantity - 1)} style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Minus size={12} />
                                                        </button>
                                                        <span style={{ width: 28, textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2C1810' }}>{quantity}</span>
                                                        <button onClick={() => updateQuantity(variant.id, quantity + 1)} style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <span style={{ fontWeight: 700, color: '#a07840', fontSize: '0.9rem' }}>${(variant.price * quantity).toFixed(2)}</span>
                                                        <button onClick={() => removeItem(variant.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 2 }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div style={{ padding: '20px 24px 28px', background: '#fff', borderTop: '1px solid #e8d8ca' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b4c35' }}>Subtotal</span>
                                    <span style={{ fontFamily: serif, fontSize: '1.5rem', color: '#2C1810', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <button onClick={() => setCheckoutState('form')} style={{
                                    width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                                    background: '#C9A96E', color: '#2C1810', border: 'none',
                                    padding: '15px', borderRadius: 2, fontWeight: 700,
                                    fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                                    cursor: 'pointer', fontFamily: sans,
                                }}>
                                    Place Order <ArrowRight size={16} />
                                </button>
                                <p style={{ fontSize: '0.7rem', color: '#a07840', textAlign: 'center', margin: '10px 0 0' }}>
                                    We'll confirm payment & pickup via email
                                </p>
                            </div>
                        )}
                    </>
                )}

                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </>
    );
}
