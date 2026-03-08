import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ShoppingBag, Box, Tag, DollarSign, PenTool, Database } from 'lucide-react';
import { useData } from '../context/DataContext';

const CostCalculator = () => {
    const { ingredients, recipes, overheads, computedProductCosts } = useData();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-10">
            <header>
                <h2 className="text-4xl font-extrabold text-white">Cost Engine Engine</h2>
                <p className="text-text-secondary mt-2 text-lg">Real-time dynamic unit costing based on bulk ingredient prices.</p>
            </header>

            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 1. Recipe Unit Costs */}
                <motion.div variants={itemVariant} className="xl:col-span-1 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                        <Calculator className="text-primary" />
                        <span>Unit Profit Metrics</span>
                    </h3>

                    {recipes.map(recipe => (
                        <div key={recipe.id} className="premium-glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-colors"></div>
                            <h4 className="text-lg font-black text-white">{recipe.name}</h4>
                            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mt-1">Batch Size: {recipe.batchSize} Units</p>

                            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-text-secondary font-bold">Calculated COGS</span>
                                    <span className="text-lg font-black text-rose-400">
                                        ${computedProductCosts[recipe.name]?.toFixed(3) || '0.00'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-text-secondary font-bold">Suggested Retail</span>
                                    <span className="text-lg font-black text-white">$4.00</span>
                                </div>
                                <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs text-text-secondary font-bold uppercase tracking-widest">Gross Margin</span>
                                    <span className="text-xl font-black text-emerald-400">
                                        {((4.00 - (computedProductCosts[recipe.name] || 0)) / 4.00 * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* 2. BOM & Ingredients */}
                <motion.div variants={itemVariant} className="xl:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                        <Database className="text-secondary" />
                        <span>Ingredient Bulk Costs</span>
                    </h3>

                    <div className="premium-glass rounded-[2rem] overflow-hidden border border-white/5">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Ingredient</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Bulk Price</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Bulk Volume</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">Cost per Gram</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {ingredients.map(ing => (
                                    <tr key={ing.id} className="hover:bg-white/[0.03] transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white flex items-center">
                                                <ShoppingBag size={14} className="mr-2 text-text-secondary inline" />
                                                {ing.name}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-emerald-400">${ing.bulkCost.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-slate-300">{ing.bulkWeight}{ing.unit}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs font-mono text-text-secondary">
                                                ${(ing.bulkCost / ing.bulkWeight).toFixed(4)}/{ing.unit}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 3. Overhead & Depreciation */}
                    <h3 className="text-xl font-bold text-white flex items-center space-x-2 mt-8">
                        <PenTool className="text-amber-500" />
                        <span>Fixed Assets & Overheads</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {overheads.map(oh => (
                            <div key={oh.id} className="premium-glass p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-amber-500/30 transition-colors">
                                <div>
                                    <p className="font-bold text-white text-sm">{oh.name}</p>
                                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-black mt-1">{oh.type}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-amber-500">${oh.cost.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CostCalculator;
