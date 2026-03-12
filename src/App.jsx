import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesInput from './components/SalesInput';
import InventoryBoard from './components/InventoryBoard';
import ExpenseTracker from './components/ExpenseTracker';
import CostCalculator from './components/CostCalculator';
import Storefront from './components/Storefront'; // keeping for reference if needed, but Home is used
import Order from './components/Order';
import AdminLogin from './components/AdminLogin';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Home from './components/Home';
import MenuPage from './components/Menu'; // Renamed import to avoid conflict with lucide Menu
import Story from './components/Story';
import ProductDetail from './components/ProductDetail';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import { LayoutDashboard, ShoppingCart, Box, Receipt, Calculator, Menu, X, Bell } from 'lucide-react';
import { DataProvider, useData } from './context/DataContext';

// App content that consumes context
const AppContent = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { balance } = useData();
    const navigate = useNavigate();

    const renderContent = () => {
        return (
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="w-full"
            >
                {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
                {activeTab === 'sales' && <SalesInput />}
                {activeTab === 'inventory' && <InventoryBoard />}
                {activeTab === 'expenses' && <ExpenseTracker />}
                {activeTab === 'costing' && <CostCalculator />}
            </motion.div>
        );
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'sales', label: 'Sales Entry', icon: <ShoppingCart size={20} /> },
        { id: 'costing', label: 'Recipe Engine', icon: <Calculator size={20} /> },
        { id: 'inventory', label: 'Inventory', icon: <Box size={20} /> },
        { id: 'expenses', label: 'Expenses', icon: <Receipt size={20} /> },
    ];


    return (
        <div className="min-h-screen bg-gradient-premium flex overflow-hidden w-full">
            {/* Dynamic Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="h-screen bg-[#11161D] border-r border-[#30363D] flex flex-col relative z-50 shrink-0 shadow-2xl"
            >
                <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap h-20">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-2xl font-extrabold tracking-tighter"
                                onClick={() => navigate('/')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="text-gradient">MoodPop</span> <span className="text-white">Admin</span>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-[#21262D] rounded-lg transition-colors text-text-secondary"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center p-3 rounded-xl transition-all relative group overflow-hidden ${activeTab === item.id
                                ? 'text-white'
                                : 'text-text-secondary hover:text-white hover:bg-[#21262D]'
                                }`}
                        >
                            <div className={`relative z-10 flex items-center space-x-4 min-w-full ${!isSidebarOpen && 'justify-center space-x-0'}`}>
                                <span className={activeTab === item.id ? 'text-primary' : ''}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && <span className="font-semibold text-sm truncate">{item.label}</span>}
                            </div>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-primary/10 border-l-[3px] border-primary"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#30363D] overflow-hidden whitespace-nowrap mt-auto">
                    <div className={`flex items-center space-x-3 p-2 rounded-xl bg-[#21262D]/50 ${!isSidebarOpen && 'justify-center space-x-0'}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-lg">M</div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">Bakery Manager</p>
                                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-black">Level Pro</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Container */}
            <main className="flex-1 min-w-0 relative overflow-y-auto scroll-smooth h-screen flex flex-col">
                {/* Top Header */}
                <header className="sticky top-0 z-40 w-full px-8 py-4 flex items-center justify-between border-b border-[#30363D] bg-background/50 backdrop-blur-md h-20 shrink-0">
                    <div className="flex items-center space-x-2 text-text-secondary">
                        <span className="text-xs uppercase tracking-widest font-bold">Workspace</span>
                        <span className="text-slate-700">/</span>
                        <span className="text-xs uppercase tracking-widest font-bold text-white capitalize">{activeTab}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                        </button>
                        <div className="h-6 w-px bg-[#30363D]"></div>
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-black">Current Balance</p>
                            <p className="text-sm font-bold text-emerald-400">
                                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="p-8 max-w-7xl mx-auto w-full min-h-full">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

function App() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    return (
        <DataProvider>
            <CartProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/story" element={<Story />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                    </Route>
                    <Route
                        path="/admin"
                        element={
                            isAdminAuthenticated ?
                                <AppContent /> :
                                <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
                        }
                    />
                </Routes>
            </CartProvider>
        </DataProvider>
    );
}

export default App;
