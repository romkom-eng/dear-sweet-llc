import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Save, Image, DollarSign, RefreshCw, Users, Download } from 'lucide-react';

const sans = "'Manrope', system-ui, sans-serif";
const serif = "'Cormorant Garamond', Georgia, serif";

function exportCSV(users) {
    const headers = ['Name', 'Email', 'Created', 'Last Login', 'Marketing Opt-In'];
    const rows = users.map(u => [
        u.name || '',
        u.email || '',
        u.createdAt?.toDate?.().toLocaleDateString() || '',
        u.lastLogin?.toDate?.().toLocaleDateString() || '',
        u.marketingOptIn ? 'Yes' : 'No',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'dear-sweet-users.csv'; a.click();
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState('products'); // 'products' | 'users'
    const [saving, setSaving] = useState(null);
    const [saved, setSaved] = useState(null);

    const loadProducts = async () => {
        const snap = await getDocs(collection(db, 'products'));
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data(), _dirty: false })));
    };

    const loadUsers = async () => {
        const snap = await getDocs(collection(db, 'users'));
        setUsers(snap.docs.map(d => d.data()));
    };

    useEffect(() => { loadProducts(); loadUsers(); }, []);

    const updateField = (id, field, value) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value, _dirty: true } : p));
    };

    const updateVariantPrice = (productId, variantId, price) => {
        setProducts(prev => prev.map(p => {
            if (p.id !== productId) return p;
            return {
                ...p, _dirty: true,
                variants: p.variants.map(v => v.id === variantId ? { ...v, price: parseFloat(price) || 0 } : v)
            };
        }));
    };

    const saveProduct = async (p) => {
        setSaving(p.id);
        try {
            const { _dirty, ...data } = p;
            await updateDoc(doc(db, 'products', p.id), data);
            setProducts(prev => prev.map(x => x.id === p.id ? { ...x, _dirty: false } : x));
            setSaved(p.id);
            setTimeout(() => setSaved(null), 2000);
        } catch (e) {
            alert('Save failed: ' + e.message);
        } finally {
            setSaving(null);
        }
    };

    const TabBtn = ({ id, label }) => (
        <button onClick={() => setTab(id)} style={{
            background: tab === id ? '#2C1810' : 'transparent',
            color: tab === id ? '#C9A96E' : '#6b4c35',
            border: `1px solid ${tab === id ? '#2C1810' : '#e8d8ca'}`,
            borderRadius: 4, padding: '8px 20px', cursor: 'pointer',
            fontFamily: sans, fontSize: '0.82rem', fontWeight: 600,
        }}>{label}</button>
    );

    return (
        <div style={{ fontFamily: sans, padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h2 style={{ fontFamily: serif, fontSize: '1.8rem', color: '#2C1810', margin: '0 0 4px', fontWeight: 600 }}>Store Manager</h2>
                    <p style={{ color: '#a07840', fontSize: '0.82rem', margin: 0 }}>{users.length} registered customers · {products.length} products</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <TabBtn id="products" label="🍪 Products" />
                    <TabBtn id="users" label={`👥 Users (${users.length})`} />
                </div>
            </div>

            {/* ── Products Tab ── */}
            {tab === 'products' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {products.map(p => (
                        <div key={p.id} style={{ background: '#fff', border: `2px solid ${p._dirty ? '#C9A96E' : '#e8d8ca'}`, borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0 }} className="admin-product-grid">
                                {/* Image preview */}
                                <div style={{ background: '#f5ecd8', aspectRatio: '1', overflow: 'hidden', maxHeight: 200 }}>
                                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={e => e.target.style.display = 'none'} />
                                </div>

                                <div style={{ padding: '20px 24px' }}>
                                    {/* Name */}
                                    <div style={{ marginBottom: 16 }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>Product Name</label>
                                        <input value={p.title} onChange={e => updateField(p.id, 'title', e.target.value)}
                                            style={{ width: '100%', boxSizing: 'border-box', background: '#FDF6EC', border: '1px solid #e8d8ca', borderRadius: 4, padding: '10px 12px', fontFamily: sans, fontSize: '0.95rem', fontWeight: 600, color: '#2C1810', outline: 'none' }} />
                                    </div>

                                    {/* Image URL */}
                                    <div style={{ marginBottom: 16 }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>
                                            <Image size={12} style={{ display: 'inline', marginRight: 4 }} />Image URL
                                        </label>
                                        <input value={p.image} onChange={e => updateField(p.id, 'image', e.target.value)}
                                            placeholder="https://..."
                                            style={{ width: '100%', boxSizing: 'border-box', background: '#FDF6EC', border: '1px solid #e8d8ca', borderRadius: 4, padding: '10px 12px', fontFamily: sans, fontSize: '0.82rem', color: '#2C1810', outline: 'none' }} />
                                    </div>

                                    {/* Variants / Prices */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 8 }}>
                                            <DollarSign size={12} style={{ display: 'inline', marginRight: 4 }} />Prices
                                        </label>
                                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                            {(p.variants || []).map(v => (
                                                <div key={v.id} style={{ background: '#FDF6EC', border: '1px solid #e8d8ca', borderRadius: 4, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{ fontSize: '0.78rem', color: '#6b4c35', whiteSpace: 'nowrap' }}>{v.label}</span>
                                                    <span style={{ color: '#a07840' }}>$</span>
                                                    <input type="number" step="0.01" value={v.price} onChange={e => updateVariantPrice(p.id, v.id, e.target.value)}
                                                        style={{ width: 64, background: 'transparent', border: 'none', outline: 'none', fontFamily: sans, fontSize: '0.9rem', fontWeight: 700, color: '#2C1810' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stripe Link */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', display: 'block', marginBottom: 6 }}>
                                            Stripe Payment Link (optional)
                                        </label>
                                        <input value={p.stripeLink || ''} onChange={e => updateField(p.id, 'stripeLink', e.target.value)}
                                            placeholder="https://buy.stripe.com/..."
                                            style={{ width: '100%', boxSizing: 'border-box', background: '#FDF6EC', border: '1px solid #e8d8ca', borderRadius: 4, padding: '10px 12px', fontFamily: sans, fontSize: '0.82rem', color: '#2C1810', outline: 'none' }} />
                                    </div>

                                    {/* Save */}
                                    <button onClick={() => saveProduct(p)} disabled={!p._dirty || saving === p.id}
                                        style={{
                                            background: saved === p.id ? '#2a7a4b' : p._dirty ? '#C9A96E' : '#f0e6d6',
                                            color: p._dirty ? '#2C1810' : '#a07840',
                                            border: 'none', borderRadius: 4, padding: '10px 24px',
                                            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                            cursor: p._dirty ? 'pointer' : 'default', fontFamily: sans,
                                            display: 'flex', alignItems: 'center', gap: 8,
                                        }}>
                                        {saving === p.id ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</> :
                                            saved === p.id ? '✓ Saved!' :
                                                <><Save size={14} /> {p._dirty ? 'Save Changes' : 'No Changes'}</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Users Tab ── */}
            {tab === 'users' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Users size={18} color="#C9A96E" />
                            <span style={{ fontWeight: 600, color: '#2C1810', fontSize: '0.95rem' }}>{users.length} Registered Users</span>
                        </div>
                        <button onClick={() => exportCSV(users)} style={{
                            background: '#2C1810', color: '#C9A96E', border: 'none', borderRadius: 4,
                            padding: '9px 20px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                            fontFamily: sans, display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <Download size={14} /> Export CSV
                        </button>
                    </div>

                    {users.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#a07840' }}>No users yet. They appear here when customers sign in.</div>
                    ) : (
                        <div style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: sans }}>
                                <thead>
                                    <tr style={{ background: '#2C1810' }}>
                                        {['Name', 'Email', 'Last Login', 'Marketing'].map(h => (
                                            <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#C9A96E', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr key={u.uid || i} style={{ borderBottom: '1px solid #f5ecd8', background: i % 2 === 0 ? '#fff' : '#fdf9f5' }}>
                                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#2C1810', fontWeight: 600 }}>{u.name || '—'}</td>
                                            <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#6b4c35' }}>{u.email}</td>
                                            <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#a07840' }}>{u.lastLogin?.toDate?.().toLocaleDateString() || '—'}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ background: u.marketingOptIn ? 'rgba(42,122,75,0.1)' : '#f5ecd8', color: u.marketingOptIn ? '#2a7a4b' : '#a07840', borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 600 }}>
                                                    {u.marketingOptIn ? '✓ Yes' : 'No'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @media (max-width: 640px) { .admin-product-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </div>
    );
}
