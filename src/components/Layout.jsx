import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import LoginModal from './auth/LoginModal';
import { ShoppingBag, Menu as MenuIcon, X, LogOut, User } from 'lucide-react';

export default function Layout() {
    const { openCart, totalItems } = useCart();
    const { user, signOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Shop' },
        { to: '/order', label: 'Order Inquiry' },
        { to: '/story', label: 'Our Story' },
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: '#FDF6EC', color: '#2C1810' }}>

            {/* ── Header ── */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: scrolled ? 'rgba(44,24,16,0.97)' : '#2C1810',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: '1px solid rgba(201,169,110,0.15)',
                transition: 'background 0.3s ease',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <img src="/logo_gold.png" alt="Dear Sweet LLC" style={{ height: 50, width: 'auto', objectFit: 'contain' }} />
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'flex', gap: 36 }} className="hidden-mobile">
                        {navLinks.map(({ to, label }) => (
                            <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: isActive ? '#C9A96E' : 'rgba(253,246,236,0.75)',
                                transition: 'color 0.2s',
                            })}>
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right: Auth + Cart + Mobile */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

                        {/* Login / User */}
                        {user ? (
                            <div style={{ position: 'relative' }}>
                                <button onClick={() => setShowUserMenu(!showUserMenu)} style={{
                                    background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)',
                                    borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                                }}>
                                    {user.photoURL
                                        ? <img src={user.photoURL} alt="avatar"
                                            referrerPolicy="no-referrer"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                        : null}
                                    <span style={{ display: user.photoURL ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                        <User size={16} color="#C9A96E" />
                                    </span>
                                </button>
                                {showUserMenu && (
                                    <div style={{
                                        position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 200,
                                        background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4,
                                        padding: '8px 0', minWidth: 180, boxShadow: '0 8px 24px rgba(44,24,16,0.12)',
                                    }}>
                                        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f5ecd8' }}>
                                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2C1810' }}>{user.displayName || 'Guest'}</div>
                                            <div style={{ fontSize: '0.72rem', color: '#a07840' }}>{user.email}</div>
                                        </div>
                                        <button onClick={() => { signOut(); setShowUserMenu(false); }} style={{
                                            width: '100%', background: 'none', border: 'none', padding: '10px 16px',
                                            textAlign: 'left', cursor: 'pointer', fontSize: '0.82rem', color: '#6b4c35',
                                            display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit',
                                        }}>
                                            <LogOut size={14} /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => setShowLogin(true)} style={{
                                background: 'none', border: '1px solid rgba(201,169,110,0.4)', borderRadius: 4,
                                padding: '6px 14px', color: 'rgba(201,169,110,0.9)', fontSize: '0.72rem',
                                fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                                Sign In
                            </button>
                        )}

                        {/* Cart */}
                        <button onClick={openCart} style={{
                            position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
                            color: '#C9A96E', padding: '8px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <ShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute', top: 2, right: 2,
                                    width: 17, height: 17, borderRadius: '50%',
                                    background: '#C9A96E', color: '#2C1810',
                                    fontSize: '0.6rem', fontWeight: 800,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Toggle */}
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile" style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#C9A96E', padding: 8, display: 'none',
                        }}>
                            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div style={{
                        background: '#2C1810', borderTop: '1px solid rgba(201,169,110,0.1)',
                        padding: '20px 24px 28px',
                        display: 'flex', flexDirection: 'column', gap: 20,
                    }}>
                        {navLinks.map(({ to, label }) => (
                            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
                                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                color: isActive ? '#C9A96E' : 'rgba(253,246,236,0.75)',
                            })}>
                                {label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </header>

            {/* ── Main ── */}
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            {/* ── Footer ── */}
            <footer style={{ background: '#1a0e09', color: 'rgba(253,246,236,0.6)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
                        <div>
                            <Link to="/" style={{ display: 'inline-block', marginBottom: 16 }}>
                                <img src="/logo_gold.png" alt="Dear Sweet LLC" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
                            </Link>
                            <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>Handcrafted luxury cookies with premium pistachio, kunafa & authentic Dubai flavors.</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 600, marginBottom: 20 }}>Shop</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <Link to="/menu" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.85rem' }}>All Cookies</Link>
                                <Link to="/story" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.85rem' }}>Our Story</Link>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 600, marginBottom: 20 }}>Contact</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem' }}>
                                <span>Seoul, South Korea</span>
                                <a href="mailto:info@dearsweetllc.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@dearsweetllc.com</a>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 600, marginBottom: 20 }}>Stay Updated</div>
                            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <input type="email" placeholder="your@email.com" style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,169,110,0.3)',
                                    borderRadius: 4, padding: '10px 14px', color: '#FDF6EC', fontSize: '0.85rem',
                                    outline: 'none', fontFamily: 'inherit',
                                }} />
                                <button type="submit" style={{
                                    background: '#C9A96E', color: '#2C1810', border: 'none',
                                    borderRadius: 4, padding: '10px', fontSize: '0.75rem',
                                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                    cursor: 'pointer',
                                }}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', letterSpacing: '0.08em', flexWrap: 'wrap', gap: 12 }}>
                        <span>© 2026 Dear Sweet LLC. All rights reserved.</span>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>

            <CartDrawer />
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700&display=swap');
                @media (max-width: 768px) {
                    .hidden-mobile { display: none !important; }
                    .show-mobile { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .show-mobile { display: none !important; }
                }
            `}</style>
        </div>
    );
}
