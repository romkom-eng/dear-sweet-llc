import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Receipt, DollarSign, Calendar, Eye, CloudUpload, ShieldCheck, TrendingDown, FileText } from 'lucide-react';
import { uploadExpenseAndProcessReceipt } from '../services/expenseService';
import { useData } from '../context/DataContext';

const ExpenseTracker = () => {
    const { addExpense, expenseHistory } = useData();
    const [file, setFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        tax_category: 'Materials',
        ingredientId: '',
    });

    const materialTotal = expenseHistory
        .filter(exp => exp.category === 'Materials')
        .reduce((sum, exp) => sum + exp.amount, 0);

    const operationalTotal = expenseHistory
        .filter(exp => exp.category !== 'Materials')
        .reduce((sum, exp) => sum + exp.amount, 0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsScanning(true);

            // Simulate AI OCR processing
            setTimeout(() => {
                setFormData({
                    amount: '48.94',
                    tax_category: 'Materials',
                    ingredientId: '1' // Maps to Patisserie Flour
                });
                setIsScanning(false);
            }, 1800);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseAmount = parseFloat(formData.amount);
        if (isNaN(expenseAmount) || expenseAmount <= 0) {
            alert("Please enter a valid expense amount.");
            return;
        }

        try {
            // In a real app we would upload the file here...
            if (file) {
                await uploadExpenseAndProcessReceipt(file, {
                    ...formData,
                    amount: expenseAmount,
                    date: new Date()
                });
            }

            // Dispatch to DataContext global store
            addExpense({
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                category: formData.tax_category,
                amount: expenseAmount,
                status: 'Verified',
                merchant: file ? 'Scanned Receipt' : 'Manual Entry'
            });

            alert(`Asset Processed.\nExpense amount of $${expenseAmount.toFixed(2)} was deducted from the Dashboard's Net Profit & Balance.`);

            // Reset state
            setFile(null);
            setFormData(prev => ({ ...prev, amount: '' }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-10">
            <header>
                <h2 className="text-4xl font-extrabold text-white">Expense Ledger</h2>
                <p className="text-text-secondary mt-2 text-lg">AI-powered receipt digestion and tax integrity tracking.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Upload Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-5 space-y-8"
                >
                    <div className="premium-glass p-10 rounded-[2.5rem] border-t-4 border-t-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-primary/10">
                            <CloudUpload size={120} />
                        </div>

                        <h3 className="text-2xl font-black text-white mb-8">Asset Ingestion</h3>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <label
                                className={`w-full h-80 border-2 border-dashed ${isScanning ? 'border-amber-500/50 bg-amber-500/5' : 'border-[#30363D] hover:border-primary hover:bg-primary/5'} rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden shadow-inner`}
                            >
                                {isScanning ? (
                                    <div className="flex flex-col items-center p-6 text-center animate-pulse">
                                        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                            <svg className="animate-spin h-10 w-10 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                        <p className="text-lg font-bold text-amber-500">Extracting JSON Receipt Data...</p>
                                        <p className="text-xs text-amber-500/50 font-black uppercase mt-1 tracking-widest">AI Vision Agent Active</p>
                                    </div>
                                ) : file ? (
                                    <div className="flex flex-col items-center p-6 text-center animate-in zoom-in-95">
                                        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 shadow-xl">
                                            <FileText size={40} />
                                        </div>
                                        <p className="text-lg font-bold text-white max-w-[200px] truncate">{file.name}</p>
                                        <p className="text-xs text-emerald-400 font-black uppercase mt-1 tracking-widest">Parsing Complete</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-6 bg-[#21262D] rounded-3xl text-text-secondary group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
                                            <Upload size={36} />
                                        </div>
                                        <div className="mt-6 text-center">
                                            <span className="block text-lg font-bold text-white">Drop Receipt Image</span>
                                            <span className="text-sm font-medium text-text-secondary">AI will auto-fill amount & category</span>
                                        </div>
                                    </>
                                )}
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" disabled={isScanning} />
                            </label>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Transaction Amount ($)</label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:scale-120 transition-transform" size={20} />
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="input-premium w-full pl-12 text-2xl font-black"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Tax Category</label>
                                        <select
                                            onChange={(e) => setFormData({ ...formData, tax_category: e.target.value })}
                                            className="input-premium w-full text-xs font-bold"
                                        >
                                            <option>Materials</option>
                                            <option>Supplies</option>
                                            <option>Permits</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Asset Link</label>
                                        <select
                                            onChange={(e) => setFormData({ ...formData, ingredientId: e.target.value })}
                                            className="input-premium w-full text-xs font-bold"
                                        >
                                            <option value="">No Direct Link</option>
                                            <option value="1">Patisserie Flour</option>
                                            <option value="2">Strawberry Purée</option>
                                            <option value="3">Unsalted Butter</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-premium w-full !py-6 text-lg tracking-tight !rounded-2xl flex items-center justify-center space-x-3">
                                <ShieldCheck size={22} />
                                <span>Validate & Authenticate</span>
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Reports Hub */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-7 space-y-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="premium-glass p-8 rounded-[2rem] border-l-4 border-l-rose-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                                    <TrendingDown size={24} />
                                </div>
                                <span className="text-[10px] font-black text-rose-400 bg-rose-400/5 px-2 py-1 rounded-full uppercase">Expended</span>
                            </div>
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Total Material Outlay</p>
                            <p className="text-3xl font-black text-white mt-1">${materialTotal.toFixed(2)}</p>
                        </div>
                        <div className="premium-glass p-8 rounded-[2rem] border-l-4 border-l-secondary">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                                    <FileText size={24} />
                                </div>
                                <span className="text-[10px] font-black text-secondary bg-secondary/5 px-2 py-1 rounded-full uppercase">Operational</span>
                            </div>
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Supplies & Logistics</p>
                            <p className="text-3xl font-black text-white mt-1">${operationalTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="premium-glass rounded-[2rem] overflow-hidden border border-white/5 relative">
                        <div className="p-8 bg-white/5 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold text-white text-xl">Historical Ledger</h3>
                            <div className="flex items-center space-x-2 text-text-secondary text-xs font-bold uppercase tracking-widest">
                                <Calendar size={16} className="text-primary" />
                                <span>Fiscal Year 2026</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/[0.01]">
                                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-widest">Transaction</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-widest">Merchant</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">Amount</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-widest text-center">Audit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {expenseHistory.map((exp) => (
                                        <tr key={exp.id} className="hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-white">{exp.date}</p>
                                                <p className="text-[10px] text-text-secondary font-bold uppercase mt-0.5 tracking-tighter">{exp.category}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-semibold text-slate-300">{exp.merchant}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <p className="text-lg font-black text-white">${exp.amount.toFixed(2)}</p>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span className={`w-2 h-2 rounded-full ${exp.status === 'Verified' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></span>
                                                    <button className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                        <Eye size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
