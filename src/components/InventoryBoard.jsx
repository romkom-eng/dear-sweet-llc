import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Edit3, ClipboardList, Filter, ChevronRight, BarChart3, AlertCircle } from 'lucide-react';
import { performInventoryAudit } from '../services/inventoryService';
import { useData } from '../context/DataContext';

const InventoryBoard = () => {
    const { inventory, stats } = useData();
    const [isAuditMode, setIsAuditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAudit = async (id, actual) => {
        try {
            const result = await performInventoryAudit(id, actual, 'Monthly Check');
            alert(`Audit completed. Variance: ${result.variance}`);
        } catch (err) {
            console.error(err);
        }
    };

    // Filter logic
    const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Total weight logic
    const totalWeight = inventory.reduce((sum, item) => sum + item.stock, 0);
    const totalWeightKg = (totalWeight / 1000).toFixed(2);


    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-white">Stock Assets</h2>
                    <p className="text-text-secondary mt-2 text-lg">Inventory precision tracking and supply chain management.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                        <BarChart3 size={18} />
                        <span>Reports</span>
                    </button>
                    <button
                        onClick={() => setIsAuditMode(!isAuditMode)}
                        className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-black transition-all shadow-xl ${isAuditMode
                            ? 'bg-primary text-white scale-105'
                            : 'bg-white text-background hover:bg-slate-200'
                            }`}
                    >
                        {isAuditMode ? <ClipboardList size={20} /> : <Edit3 size={20} />}
                        <span>{isAuditMode ? 'Finalize Audit' : 'Initialize Audit'}</span>
                    </button>
                </div>
            </header>

            {/* Analytics Mini Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-glass p-6 rounded-3xl border border-white/5 shadow-inner flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Package size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Global Assets</p>
                        <p className="text-2xl font-black text-white">{totalWeightKg}kg</p>
                    </div>
                </div>
                <div className="premium-glass p-6 rounded-3xl border border-white/5 shadow-inner flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                        <AlertCircle size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Low Stock Alerts</p>
                        <p className="text-2xl font-black text-white">{stats.lowStockItems} Items</p>
                    </div>
                </div>
                <div className="premium-glass p-6 rounded-3xl border border-white/5 shadow-inner flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <Filter size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Active Channels</p>
                        <p className="text-2xl font-black text-white">4 Supply Lines</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search assets by name or batch ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#161B22] border border-[#30363D] rounded-3xl pl-16 pr-8 py-6 text-white text-lg font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-2xl"
                    />
                </div>

                <div className="premium-glass rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-10 py-8 text-xs font-black text-text-secondary uppercase tracking-[0.2em]">Asset Information</th>
                                <th className="px-10 py-8 text-xs font-black text-text-secondary uppercase tracking-[0.2em] text-right">Available Stock</th>
                                <th className="px-10 py-8 text-xs font-black text-text-secondary uppercase tracking-[0.2em] text-right">Valuation</th>
                                <th className="px-10 py-8 text-xs font-black text-text-secondary uppercase tracking-[0.2em] text-center">Health</th>
                                {isAuditMode && <th className="px-10 py-8 text-xs font-black text-primary uppercase tracking-[0.2em] text-center bg-primary/5 animate-pulse">Audit Input</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredInventory.map((item) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={item.id}
                                        className="hover:bg-white/[0.03] transition-colors group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center space-x-5">
                                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-${item.color}-500 group-hover:bg-${item.color}-500 group-hover:text-white transition-all duration-500 shadow-inner`}>
                                                    <Package size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-lg tracking-tight">{item.name}</p>
                                                    <p className="text-xs text-text-secondary mt-1 flex items-center font-medium">
                                                        Batch #B-{(204 + item.id.length).toString(16).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <p className="text-xl font-black text-white">{item.stock.toLocaleString()}</p>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{item.unit}</p>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <p className="text-lg font-bold text-emerald-400">${item.price.toFixed(3)}</p>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">per {item.unit}</p>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${item.status === 'Critical' || item.status === 'Depleted'
                                                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                                                    : item.status === 'Low' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                                {(item.status === 'Critical' || item.status === 'Depleted') && <p className="text-[9px] text-rose-400 font-bold uppercase animate-pulse">Action Required</p>}
                                            </div>
                                        </td>
                                        {isAuditMode && (
                                            <td className="px-10 py-8 bg-primary/5">
                                                <div className="flex items-center justify-center space-x-3">
                                                    <input
                                                        type="number"
                                                        placeholder="Actual"
                                                        className="w-28 bg-[#0F172A] border-2 border-primary/30 rounded-xl px-4 py-3 text-sm text-primary font-black focus:outline-none focus:border-primary shadow-lg"
                                                    />
                                                    <button
                                                        onClick={() => handleAudit(item.id, 100)}
                                                        className="p-3 bg-primary hover:bg-primary-hover rounded-xl text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
                                                    >
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryBoard;
