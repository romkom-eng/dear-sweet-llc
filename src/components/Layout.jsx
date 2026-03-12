import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { ShoppingBag, Menu as MenuIcon } from 'lucide-react';

export default function Layout() {
    const { openCart, checkout } = useCart();

    const totalItems = checkout?.lineItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/90 backdrop-blur-md dark:bg-background-dark/90 transition-colors">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">

                    <NavLink to="/" className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl">cookie</span>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            두바이쫀득쿠키
                        </h1>
                    </NavLink>

                    <nav className="hidden md:flex items-center gap-10">
                        <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary dark:text-slate-300'}`}>
                            Home
                        </NavLink>
                        <NavLink to="/menu" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary dark:text-slate-300'}`}>
                            Menu
                        </NavLink>
                        <NavLink to="/story" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary dark:text-slate-300'}`}>
                            Our Story
                        </NavLink>
                        <a href="/admin" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">
                            Admin
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={openCart}
                            className="relative p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center text-primary"
                        >
                            <ShoppingBag size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background-light dark:ring-background-dark">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <div className="md:hidden">
                            <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                                <MenuIcon size={24} />
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-background-dark text-slate-300 border-t border-primary/10">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">cookie</span>
                                <h2 className="text-lg font-bold text-white uppercase tracking-tighter">두바이쫀득쿠키</h2>
                            </div>
                            <p className="text-sm leading-relaxed opacity-70">
                                Crafting moments of pure joy through real Dubai chocolate and premium chewy cookies.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">camera</span>
                                </a>
                                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
                            <ul className="flex flex-col gap-4 text-sm opacity-70">
                                <li><NavLink to="/menu" className="hover:text-primary transition-colors">Order Online</NavLink></li>
                                <li><NavLink to="/story" className="hover:text-primary transition-colors">Our Brand</NavLink></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Visit Us</h4>
                            <div className="flex flex-col gap-4 text-sm opacity-70">
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <p>Seoul, South Korea<br />(Coming Soon to physical retail)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Newsletter</h4>
                            <p className="mb-4 text-sm opacity-70">Join our mailing list for drop updates.</p>
                            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Your email" className="rounded-lg bg-white/5 border-transparent px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary text-white outline-none" />
                                <button className="w-full rounded-lg bg-primary py-2.5 text-xs font-bold uppercase text-white hover:opacity-90 transition-opacity">Subscribe</button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
                        <p>© 2026 Dubai Chewy Cookie. All rights reserved.</p>
                        <div className="flex gap-4">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Global Slide-over Cart */}
            <CartDrawer />

        </div>
    );
}
