import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, DollarSign, Plus, Minus, CheckCircle2, Info } from 'lucide-react';
import { registerSale } from '../services/salesService';
import { useData } from '../context/DataContext';

const SalesInput = () => {
    const { addSale, computedProductCosts } = useData();
    const [product, setProduct] = useState('Original');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(3.5);
    const [channel, setChannel] = useState('Direct');
    const [participants, setParticipants] = useState(['Member A']);
    const [fees, setFees] = useState({ commission: 0, booth: 0 });
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const members = ['Member A', 'Member B', 'Member C'];

    const toggleParticipant = (member) => {
        if (participants.includes(member)) {
            if (participants.length > 1) {
                setParticipants(participants.filter(m => m !== member));
            }
        } else {
            setParticipants([...participants, member]);
        }
    };

    // Map simplified flavor names to recipe names for accurate COGS
    const getRecipeName = (flavor) => {
        if (flavor === 'Original') return 'Dubai Chewy (Original)';
        if (flavor === 'Strawberry') return 'Dubai Chewy (Strawberry)';
        return 'Dubai Chewy (Original)'; // Fallback
    };

    const grossSales = quantity * unitPrice;
    const estCOGS = quantity * (computedProductCosts[getRecipeName(product)] || 1.25); // Dynamic API connection
    const platformFees = fees.commission + fees.booth;
    const netProfit = grossSales - estCOGS - platformFees;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                product_type: product,
                quantity,
                unit_price: unitPrice,
                channel,
                participants,
                commission_fee: fees.commission,
                booth_fee: fees.booth,
                netProfit: netProfit, // Add calculated net profit to payload for context
                date: date,
            };

            const result = await registerSale(data);

            // Dispatch to global state
            addSale(data);

            alert(`Sale registered! Net Profit: $${result.totalNetProfit.toFixed(2)}\nThe Dashboard has been updated.`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-white">Sales Inception</h2>
                    <p className="text-text-secondary mt-2 text-lg">Record daily transactions and calculate per-person settlements.</p>
                </div>
                <div className="flex items-center space-x-2 text-white/40 bg-white/5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                    <Info size={14} />
                    <span>Real-time reconciliation enabled</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <form onSubmit={handleSubmit} className="premium-glass p-10 rounded-[2.5rem] space-y-10 border border-white/5">
                        {/* Product Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-text-secondary uppercase tracking-[0.2em]">Product Flavor</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Original', 'Strawberry'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setProduct(p)}
                                            className={`py-4 rounded-2xl border-2 transition-all font-bold text-sm ${product === p
                                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(255,77,141,0.2)]'
                                                : 'bg-white/5 border-transparent text-text-secondary hover:bg-white/10'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-text-secondary uppercase tracking-[0.2em]">Sales Channel</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {['Direct (Offline)', 'Retail Partner', 'Pop-up Market'].map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setChannel(c)}
                                            className={`px-6 py-4 rounded-2xl border-2 transition-all font-bold text-sm text-left flex justify-between items-center ${channel === c
                                                ? 'bg-secondary/20 border-secondary text-white'
                                                : 'bg-white/5 border-transparent text-text-secondary hover:bg-white/10'
                                                }`}
                                        >
                                            {c}
                                            {channel === c && <CheckCircle2 size={18} className="text-secondary" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Date, Quantity and Price */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Transaction Date</label>
                                <div className="relative h-16 bg-white/5 border border-white/10 rounded-2xl p-2 group focus-within:border-primary/50 transition-all flex items-center px-4">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-transparent text-white font-bold focus:outline-none placeholder-text-secondary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Cookie Quantity</label>
                                <div className="flex items-center h-16 bg-white/5 border border-white/10 rounded-2xl p-2 group focus-within:border-primary/50 transition-all px-4">
                                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-primary transition-colors"><Minus size={18} /></button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="flex-1 bg-transparent text-center text-xl text-white font-black focus:outline-none"
                                    />
                                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-primary transition-colors"><Plus size={18} /></button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Unit Price ($)</label>
                                <div className="relative h-16 bg-white/5 border border-white/10 rounded-2xl p-2 group focus-within:border-emerald-500/50 transition-all">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={unitPrice}
                                        onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                        className="w-full h-full bg-transparent pl-10 pr-4 text-xl text-white font-black focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Participants */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] block">Member Contributions</label>
                            <div className="flex flex-wrap gap-4">
                                {members.map(member => (
                                    <button
                                        key={member}
                                        type="button"
                                        onClick={() => toggleParticipant(member)}
                                        className={`px-8 py-3 rounded-full border-2 transition-all font-bold text-sm flex items-center space-x-2 ${participants.includes(member)
                                            ? 'bg-primary border-primary text-white shadow-xl translate-y-[-2px]'
                                            : 'border-[#30363D] text-text-secondary hover:border-white/20'
                                            }`}
                                    >
                                        <span>{member}</span>
                                        {participants.includes(member) && <CheckCircle2 size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn-premium w-full !py-6 text-xl tracking-tight !rounded-3xl">
                            Register Transaction & Sync Data
                        </button>
                    </form>
                </motion.div>

                {/* Live Preview Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="premium-glass p-8 rounded-[2.5rem] border-0 bg-gradient-to-br from-[#161B22] to-[#0F172A] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full"></div>
                        <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Live Reckoning</h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary font-medium">Gross Revenue</span>
                                <span className="text-white font-bold text-lg">${grossSales.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary font-medium">Estimated COGS</span>
                                <span className="text-rose-400 font-bold">-${estCOGS.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary font-medium">Total Reductions</span>
                                <span className="text-slate-500 font-bold">-${platformFees.toFixed(2)}</span>
                            </div>
                            <div className="pt-8 mt-4 border-t border-white/5">
                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-1">Estimated Net Profit</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-black text-emerald-400">${netProfit.toFixed(2)}</span>
                                    <span className="text-xs text-text-secondary font-bold">USD</span>
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-3">Individual Payout</p>
                                <p className="text-2xl font-black text-primary">${(netProfit / participants.length).toFixed(2)}</p>
                                <p className="text-[10px] text-text-secondary mt-1 font-medium italic">Shared between {participants.length} member(s)</p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-glass p-8 rounded-[2rem] border border-white/5 space-y-4">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center">
                            <span className="w-1.5 h-4 bg-primary rounded-full mr-2"></span>
                            External Cost Overrides
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Marketing/Comm Fee"
                                    value={fees.commission}
                                    onChange={(e) => setFees({ ...fees, commission: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Booth/Logistics Fee"
                                    value={fees.booth}
                                    onChange={(e) => setFees({ ...fees, booth: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SalesInput;
