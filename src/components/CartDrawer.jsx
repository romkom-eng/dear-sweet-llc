import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Loader2, MapPin, Truck } from 'lucide-react';
import emailjs from '@emailjs/browser';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_glti2i5';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_i69i2pi';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

const MINIMUM_SHIPPING_AMOUNT = 140.00; // 택배 배송 최소 주문 금액

export default function CartDrawer() {
    const { items, isCartOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart();
    const { user } = useAuth();
    const [checkoutState, setCheckoutState] = useState('idle'); // 'idle' | 'form' | 'sending' | 'sent'
    const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'shipping'
    const [contact, setContact] = useState({ name: user?.displayName || '', email: user?.email || '', phone: '', notes: '' });

    const today = new Date().toISOString().split('T')[0];

    const isMinimumMet = deliveryMethod === 'pickup' || subtotal >= MINIMUM_SHIPPING_AMOUNT;
    const shippingFee = deliveryMethod === 'shipping' ? 29.00 : 0;
    const total = subtotal + shippingFee;

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
                product: items.map(i => `${i.product.title.replace(' Dubai Chewy Cookie', '')} (${i.variant.label}) x${i.quantity}`).join(', '),
                quantity: `${totalItems} item(s)`,
                pickup_date: contact.date || 'TBD',
                pickup_time: contact.time || 'TBD',
                pickup_location: deliveryMethod === 'pickup' ? 'Irvine, CA' : 'Next Day Air Shipping',
                details: `ORDER SUMMARY:\n${orderSummary}\n\nMETHOD: ${deliveryMethod.toUpperCase()}\nSUBTOTAL: $${subtotal.toFixed(2)}\nSHIPPING: $${shippingFee.toFixed(2)}\nTOTAL: $${total.toFixed(2)}\n\nPAYMENT STATUS: PENDING (Customer redirected to Stripe)\n\nCUSTOMER NOTES: ${contact.notes || 'None'}`,
            }, EMAILJS_PUBLIC_KEY);
            setCheckoutState('sent');
            clearCart();
        } catch (error) {
            console.error('EmailJS Error:', error);
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
                        <div style={{ position: 'relative' }}>
                            <CheckCircle2 size={56} color="#2a7a4b" />
                            <div style={{ position: 'absolute', top: -4, right: -4, background: '#C9A96E', color: '#2C1810', fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em' }}>STEP 1/2</div>
                        </div>
                        <h3 style={{ fontFamily: serif, fontSize: '1.8rem', color: '#2C1810', margin: 0 }}>Details Received!</h3>
                        <p style={{ color: '#6b4c35', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 280 }}>
                            To confirm your {deliveryMethod} order, please complete the final payment via Stripe below.
                        </p>

                        <div style={{ width: '100%', padding: '24px 20px', background: '#fff', border: '2px solid #C9A96E', borderRadius: 8, marginTop: 8, boxShadow: '0 8px 24px rgba(201,169,110,0.15)' }}>
                            <p style={{ fontSize: '0.8rem', color: '#2C1810', fontWeight: 700, marginBottom: 16, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Final Step: Secure Payment</p>
                            <a href="https://buy.stripe.com/dRmbIU36T37L76oa6idwc00" target="_blank" rel="noopener noreferrer" style={{
                                width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                                background: '#635BFF', color: '#fff', border: 'none',
                                borderRadius: 4, padding: '16px', fontWeight: 800, fontSize: '0.9rem',
                                letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, textDecoration: 'none'
                            }}>
                                Pay ${total.toFixed(2)} Now
                            </a>
                            <p style={{ fontSize: '0.68rem', color: '#a07840', marginTop: 12 }}>Payment is required to confirm your order.</p>
                        </div>

                        <button onClick={() => { closeCart(); setCheckoutState('idle'); }} style={{
                            marginTop: 16, background: 'none', border: '1px solid #e8d8ca',
                            color: '#6b4c35', borderRadius: 4, padding: '10px 24px', fontWeight: 600, fontSize: '0.75rem',
                            letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                        }}>
                            Return Home
                        </button>
                    </div>
                )}

                {/* ── CHECKOUT FORM ── */}
                {checkoutState === 'form' && (
                    <form onSubmit={handleCheckout} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(201,169,110,0.1)', borderRadius: 8, border: '1px solid rgba(201,169,110,0.2)', marginBottom: 8 }}>
                            {deliveryMethod === 'pickup' ? <MapPin size={18} color="#a07840" /> : <Truck size={18} color="#a07840" />}
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2C1810' }}>{deliveryMethod === 'pickup' ? 'Local Pickup' : 'Next Day Air Shipping'}</div>
                                <div style={{ fontSize: '0.68rem', color: '#a07840' }}>{deliveryMethod === 'pickup' ? 'Irvine, CA' : 'Delivery to your door'}</div>
                            </div>
                        </div>

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

                        {deliveryMethod === 'pickup' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>Pickup Date *</label>
                                    <input type="date" required min={today} value={contact.date || ''} onChange={e => setContact({ ...contact, date: e.target.value })}
                                        style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '11px 14px', fontFamily: sans, fontSize: '0.88rem', color: '#2C1810', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>Pickup Time *</label>
                                    <input type="time" required value={contact.time || ''} onChange={e => setContact({ ...contact, time: e.target.value })}
                                        style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '11px 14px', fontFamily: sans, fontSize: '0.88rem', color: '#2C1810', outline: 'none' }} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>Additional Notes</label>
                            <textarea placeholder="Any special requests?" value={contact.notes || ''} onChange={e => setContact({ ...contact, notes: e.target.value })}
                                style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '11px 14px', fontFamily: sans, fontSize: '0.88rem', color: '#2C1810', outline: 'none', resize: 'vertical', minHeight: 60 }} />
                        </div>

                        {/* Order summary */}
                        <div style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: 16 }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', marginBottom: 12 }}>Order Summary</div>
                            {items.map(({ product, variant, quantity }) => (
                                <div key={variant.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#2C1810', marginBottom: 6 }}>
                                    <span>{product.title} ({variant.label}) ×{quantity}</span>
                                    <span style={{ fontWeight: 700 }}>${(variant.price * quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #f5ecd8', paddingTop: 10, marginTop: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#2C1810', marginBottom: 4 }}>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: deliveryMethod === 'shipping' ? '#2C1810' : '#a0a0a0', marginBottom: 8 }}>
                                    <span>{deliveryMethod === 'shipping' ? 'Shipping (Next Day Air)' : 'Pickup Fee'}</span>
                                    <span>${shippingFee.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#2C1810', fontSize: '1.1rem', paddingTop: 8, borderTop: '1px solid #f5ecd8' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#a07840' }}>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={checkoutState === 'sending'} style={{
                            background: '#C9A96E', color: '#2C1810', border: 'none', borderRadius: 4,
                            padding: '14px', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em',
                            textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}>
                            {checkoutState === 'sending' ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing…</> : 'Confirm & Proceed to Payment'}
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
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                    {/* Delivery Toggle - Mandatory Section */}
                                    <div style={{ marginBottom: 8 }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 10 }}>Select Delivery Method *</label>
                                        <div style={{ display: 'flex', background: 'rgba(201,169,110,0.1)', borderRadius: 8, padding: 4, border: '1px solid rgba(201,169,110,0.2)' }}>
                                            <button onClick={() => setDeliveryMethod('pickup')} style={{
                                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                                padding: '12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: sans, fontSize: '0.85rem', fontWeight: 700,
                                                background: deliveryMethod === 'pickup' ? '#2C1810' : 'transparent',
                                                color: deliveryMethod === 'pickup' ? '#C9A96E' : '#a07840',
                                                boxShadow: deliveryMethod === 'pickup' ? '0 4px 12px rgba(44,24,16,0.15)' : 'none',
                                                transition: 'all 0.2s',
                                            }}>
                                                <MapPin size={16} /> Local Pickup
                                            </button>
                                            <button onClick={() => setDeliveryMethod('shipping')} style={{
                                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                                padding: '12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: sans, fontSize: '0.85rem', fontWeight: 700,
                                                background: deliveryMethod === 'shipping' ? '#2C1810' : 'transparent',
                                                color: deliveryMethod === 'shipping' ? '#C9A96E' : '#a07840',
                                                boxShadow: deliveryMethod === 'shipping' ? '0 4px 12px rgba(44,24,16,0.15)' : 'none',
                                                transition: 'all 0.2s',
                                            }}>
                                                <Truck size={16} /> Shipping
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div style={{ padding: '20px 24px 28px', background: '#fff', borderTop: '1px solid #e8d8ca' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b4c35' }}>Subtotal</span>
                                    <span style={{ fontFamily: serif, fontSize: '1.2rem', color: '#2C1810', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <span style={{ fontSize: '0.78rem', color: deliveryMethod === 'shipping' ? '#6b4c35' : '#a0a0a0' }}>{deliveryMethod === 'shipping' ? 'Shipping (Next Day Air)' : 'Pickup Fee'}</span>
                                    <span style={{ fontSize: '0.9rem', color: deliveryMethod === 'shipping' ? '#2C1810' : '#a0a0a0' }}>+${shippingFee.toFixed(2)}</span>
                                </div>

                                {!isMinimumMet && (
                                    <div style={{ textAlign: 'center', marginBottom: 16, padding: '10px 14px', background: 'rgba(201,169,110,0.1)', border: '1px dashed rgba(201,169,110,0.4)', borderRadius: 4 }}>
                                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#a07840', fontWeight: 600, lineHeight: 1.4 }}>
                                            Minimum order for shipping is ${MINIMUM_SHIPPING_AMOUNT.toFixed(2)}.<br />
                                            Add <span style={{ color: '#2C1810', fontWeight: 800 }}>${(MINIMUM_SHIPPING_AMOUNT - subtotal).toFixed(2)}</span> more to ship.
                                        </p>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingTop: 12, borderTop: '1px solid #f5ecd8' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2C1810' }}>Total Estimation</span>
                                    <span style={{ fontFamily: serif, fontSize: '1.6rem', color: '#a07840', fontWeight: 700 }}>${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => setCheckoutState('form')}
                                    disabled={!isMinimumMet}
                                    style={{
                                        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                                        background: !isMinimumMet ? '#e8d8ca' : '#C9A96E',
                                        color: !isMinimumMet ? '#a07840' : '#2C1810',
                                        border: 'none',
                                        padding: '15px', borderRadius: 2, fontWeight: 700,
                                        fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                                        cursor: !isMinimumMet ? 'not-allowed' : 'pointer', fontFamily: sans,
                                    }}>
                                    Place Order <ArrowRight size={16} />
                                </button>
                                <p style={{ fontSize: '0.7rem', color: '#a07840', textAlign: 'center', margin: '14px 0 0', lineHeight: 1.4 }}>
                                    {deliveryMethod === 'pickup'
                                        ? "Pick up in Irvine, CA. We'll email confirmation."
                                        : "Next Day Air Shipping. We'll email details."}
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
