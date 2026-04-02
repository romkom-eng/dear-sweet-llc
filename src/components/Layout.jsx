import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import LoginModal from './auth/LoginModal';
import { ShoppingBag, Menu as MenuIcon, X, LogOut, User } from 'lucide-react';
import { db } from '../services/firebase';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';

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

    // Record purchase into Firebase from localStorage pending_order
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('success') === 'true' && user) {
            const pendingOrderStr = localStorage.getItem('pending_order');
            if (pendingOrderStr) {
                try {
                    const productIds = JSON.parse(pendingOrderStr);
                    if (Array.isArray(productIds) && productIds.length > 0) {
                        const purchasesRef = doc(db, 'purchases', user.uid);
                        setDoc(purchasesRef, {
                            items: arrayUnion(...productIds),
                            updatedAt: new Date().toISOString()
                        }, { merge: true })
                            .then(() => {
                                localStorage.removeItem('pending_order');
                                console.log('Purchase recorded for reviews!');
                            })
                            .catch(err => console.error('Error recording purchase:', err));
                    }
                } catch (e) {
                    console.error('Error parsing pending order', e);
                }
            }
        }
    }, [user]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Shop' },
        { to: '/order', label: 'Order Inquiry' },
        { to: '/story', label: 'Our Story' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-body bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">

            {/* ── Header ── */}
            <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-secondary/20 dark:border-white/10'
                : 'bg-transparent border-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">

                    {/* Mobile Menu Toggle (Left) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-full hover:bg-secondary/10 dark:hover:bg-white/5 transition-colors sm:hidden"
                    >
                        <MenuIcon className="text-primary dark:text-secondary" size={24} />
                    </button>

                    {/* Logo (Center on mobile, Left on desktop) */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo_gold.png" alt="Dear Sweet LLC" className="h-10 sm:h-12 w-auto object-contain" />
                    </Link>

                    {/* Desktop Nav (Center) */}
                    <nav className="hidden sm:flex items-center gap-8">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) => `
                                    text-[13px] font-bold tracking-[0.2em] uppercase transition-colors
                                    ${isActive ? 'text-primary' : 'text-text-light/60 dark:text-text-dark/60 hover:text-primary'}
                                `}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Tools: Auth + Cart */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* User Profile / Login */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="p-1 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all overflow-hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-surface-light dark:bg-surface-dark"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-primary" size={20} />
                                    )}
                                </button>
                                {showUserMenu && (
                                    <div className="absolute top-full mt-2 right-0 w-48 bg-surface-light dark:bg-surface-dark border border-secondary/10 dark:border-white/10 rounded-xl shadow-xl py-2 z-[110]">
                                        <div className="px-4 py-2 border-b border-secondary/10 dark:border-white/10 mb-1">
                                            <p className="text-xs font-bold text-primary truncate">{user.displayName || 'Guest'}</p>
                                            <p className="text-[10px] opacity-60 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { signOut(); setShowUserMenu(false); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-primary/5 transition-colors text-primary"
                                        >
                                            <LogOut size={14} /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={openCart}
                            className="relative p-2 rounded-full hover:bg-secondary/10 dark:hover:bg-white/5 transition-colors"
                        >
                            <ShoppingBag className="text-primary dark:text-secondary" size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-background-light dark:border-background-dark">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileOpen && (
                    <div className="sm:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-secondary/10 dark:border-white/10 px-6 py-8 flex flex-col gap-6">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) => `
                                    text-base font-display font-bold uppercase tracking-widest
                                    ${isActive ? 'text-primary' : 'text-text-light/60 dark:text-text-dark/60'}
                                `}
                            >
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
            <footer className="bg-surface-dark text-text-dark/60 mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
                        {/* Brand */}
                        <div className="flex flex-col gap-6">
                            <Link to="/">
                                <img src="/logo_gold.png" alt="Dear Sweet LLC" className="h-14 w-auto object-contain" />
                            </Link>
                            <p className="text-xs leading-loose max-w-xs">
                                Handcrafted luxury cookies with premium pistachio, kunafa & authentic Dubai flavors.
                                Baked with love in Irvine, CA.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Shop</h4>
                            <div className="flex flex-col gap-3">
                                <Link to="/menu" className="text-xs hover:text-primary transition-colors">All Cookies</Link>
                                <Link to="/story" className="text-xs hover:text-primary transition-colors">Our Story</Link>
                                <Link to="/order" className="text-xs hover:text-primary transition-colors">Wholesale</Link>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Contact</h4>
                            <div className="flex flex-col gap-3 text-xs leading-relaxed">
                                <p>Irvine, California, USA</p>
                                <a href="mailto:info@dearsweetllc.com" className="hover:text-primary transition-colors">info@dearsweetllc.com</a>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Stay Sweet</h4>
                            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50 transition-all font-body"
                                />
                                <button className="bg-primary text-white text-[10px] items-center font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary/90 transition-all">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase font-bold">
                        <p>© 2026 Dear Sweet LLC. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-x-8 gap-y-2">
                            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                            <Link to="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
                            <Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <CartDrawer />
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </div>
    );
}
