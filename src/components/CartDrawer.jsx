import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Loader2, MapPin, Truck, Calendar, Clock, Clipboard } from 'lucide-react';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

const MINIMUM_SHIPPING_AMOUNT = 140.00;

export default function CartDrawer() {
    const { items, isCartOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
    const { user } = useAuth();

    const [isRedirecting, setIsRedirecting] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'shipping'
    const [contact, setContact] = useState({
        date: '',
        time: '',
        notes: ''
    });

    const isMinimumMet = deliveryMethod === 'pickup' || subtotal >= MINIMUM_SHIPPING_AMOUNT;
    const shippingFee = deliveryMethod === 'shipping' ? 29.00 : 0;
    const total = subtotal + shippingFee;
    const today = new Date().toISOString().split('T')[0];

    const handleStripeCheckout = async () => {
        if (deliveryMethod === 'pickup' && (!contact.date || !contact.time)) {
            alert('Please select a pickup date and time.');
            return;
        }

        setIsRedirecting(true);
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    deliveryMethod,
                    shippingFee,
                    metadata: {
                        pickup_date: contact.date || 'N/A',
                        pickup_time: contact.time || 'N/A',
                        customer_notes: contact.notes || 'None'
                    }
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Stripe Redirect Error:', error);
            alert('Failed to redirect to payment. Please try again.');
            setIsRedirecting(false);
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
                        <span style={{ fontFamily: serif, fontSize: '1.2rem', color: '#C9A96E', fontWeight: 600 }}>Your Cart</span>
                        {totalItems > 0 && (
                            <span style={{ background: '#C9A96E', color: '#2C1810', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 800 }}>
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(201,169,110,0.7)', padding: 4 }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                    {items.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem' }}>🍪</div>
                            <p style={{ color: '#a07840', fontFamily: serif, fontSize: '1.2rem' }}>Your cart is empty</p>
                            <button onClick={closeCart} style={{ background: '#2C1810', color: '#C9A96E', border: 'none', borderRadius: 4, padding: '12px 32px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans, marginTop: 12 }}>
                                Go Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Items List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {items.map(({ product, variant, quantity }) => (
                                    <div key={variant.id} style={{ display: 'flex', gap: 16, padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #e8d8ca' }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 4, overflow: 'hidden', background: '#f5ecd8', flexShrink: 0 }}>
                                            <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: serif, fontSize: '0.95rem', color: '#2C1810', fontWeight: 600, marginBottom: 2 }}>{product.title}</div>
                                            <div style={{ fontSize: '0.72rem', color: '#a07840', marginBottom: 8 }}>{variant.label}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8d8ca', borderRadius: 4 }}>
                                                    <button onClick={() => updateQuantity(variant.id, quantity - 1)} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Minus size={10} />
                                                    </button>
                                                    <span style={{ width: 24, textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#2C1810' }}>{quantity}</span>
                                                    <button onClick={() => updateQuantity(variant.id, quantity + 1)} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Plus size={10} />
                                                    </button>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <span style={{ fontWeight: 700, color: '#2C1810', fontSize: '0.85rem' }}>${(variant.price * quantity).toFixed(2)}</span>
                                                    <button onClick={() => removeItem(variant.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}>
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Options */}
                            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8d8ca', padding: 16 }}>
                                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                                    <button onClick={() => setDeliveryMethod('pickup')} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: deliveryMethod === 'pickup' ? '#2C1810' : '#f5ecd8', color: deliveryMethod === 'pickup' ? '#C9A96E' : '#6b4c35', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <MapPin size={14} /> Pickup
                                    </button>
                                    <button onClick={() => setDeliveryMethod('shipping')} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: deliveryMethod === 'shipping' ? '#2C1810' : '#f5ecd8', color: deliveryMethod === 'shipping' ? '#C9A96E' : '#6b4c35', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <Truck size={14} /> Shipping
                                    </button>
                                </div>

                                {deliveryMethod === 'pickup' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                            <div>
                                                <label style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#a07840', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                                                    <Calendar size={10} /> Date
                                                </label>
                                                <input type="date" min={today} required value={contact.date} onChange={e => setContact({ ...contact, date: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #e8d8ca', borderRadius: 4, padding: '8px 10px', fontSize: '0.8rem', background: '#FDF6EC' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#a07840', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                                                    <Clock size={10} /> Time
                                                </label>
                                                <input type="time" required value={contact.time} onChange={e => setContact({ ...contact, time: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #e8d8ca', borderRadius: 4, padding: '8px 10px', fontSize: '0.8rem', background: '#FDF6EC' }} />
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#6b4c35', fontStyle: 'italic', background: 'rgba(201,169,110,0.1)', padding: '8px 10px', borderRadius: 4, borderLeft: '2px solid #C9A96E' }}>
                                            Location: Irivine, CA (address shared after payment)
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '0.75rem', color: '#6b4c35', lineHeight: 1.5, padding: '4px 0' }}>
                                        Next Day Air Shipping. Total must be over ${MINIMUM_SHIPPING_AMOUNT.toFixed(0)} to qualify.
                                    </div>
                                )}

                                <div style={{ marginTop: 12 }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#a07840', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                                        <Clipboard size={10} /> Special Notes
                                    </label>
                                    <textarea placeholder="e.g. Allergies, gift note..." value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #e8d8ca', borderRadius: 4, padding: '10px', fontSize: '0.8rem', background: '#FDF6EC', resize: 'none', height: 60 }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{ padding: '24px 24px 32px', background: '#fff', borderTop: '1px solid #e8d8ca', boxShadow: '0 -8px 24px rgba(44,24,16,0.04)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b4c35' }}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: deliveryMethod === 'shipping' ? '#6b4c35' : '#a0a0a0' }}>
                                <span>{deliveryMethod === 'shipping' ? 'Shipping (Next Day Air)' : 'Pickup Fee'}</span>
                                <span>{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Free'}</span>
                            </div>

                            {!isMinimumMet && (
                                <div style={{ background: '#FFF2F2', border: '1px solid #FFDCDC', borderRadius: 6, padding: '10px 12px', marginTop: 4 }}>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#D32F2F', fontWeight: 600 }}>
                                        Add ${(MINIMUM_SHIPPING_AMOUNT - subtotal).toFixed(2)} more to unlock shipping.
                                    </p>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f5ecd8', paddingTop: 12, marginTop: 4 }}>
                                <span style={{ fontWeight: 800, color: '#2C1810', fontSize: '0.95rem' }}>Total</span>
                                <span style={{ fontFamily: serif, fontSize: '1.6rem', color: '#a07840', fontWeight: 700 }}>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleStripeCheckout}
                            disabled={!isMinimumMet || isRedirecting}
                            style={{
                                width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10,
                                background: !isMinimumMet ? '#e8d8ca' : '#C9A96E',
                                color: !isMinimumMet ? '#a07840' : '#2C1810',
                                border: 'none', borderRadius: 4, padding: '16px', fontWeight: 800,
                                fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                                cursor: !isMinimumMet ? 'not-allowed' : 'pointer', fontFamily: sans,
                                boxShadow: isMinimumMet ? '0 4px 12px rgba(201,169,110,0.3)' : 'none'
                            }}>
                            {isRedirecting ? (
                                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Redirecing to Stripe...</>
                            ) : (
                                <>Pay with Stripe <ArrowRight size={18} /></>
                            )}
                        </button>
                    </div>
                )}
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </>
    );
}
