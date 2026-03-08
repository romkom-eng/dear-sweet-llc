import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Users, Wallet, ArrowUpRight, ArrowDownRight, Box } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useData } from '../context/DataContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = ({ setActiveTab }) => {
    const { stats, balance, chartDataState, inventory } = useData();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const displayStats = [
        { label: 'Monthly Revenue', value: `$${stats.monthlyRevenue.toLocaleString()}`, icon: <TrendingUp size={20} />, trend: '+14.5%', positive: true, onClick: 'sales' },
        { label: 'Net Profit', value: `$${stats.netProfit.toLocaleString()}`, icon: <Wallet size={20} />, trend: '+10.2%', positive: true, onClick: 'expenses' },
        { label: 'Total Sales', value: stats.totalSales.toLocaleString(), icon: <Users size={20} />, trend: '-2.4%', positive: false, onClick: 'sales' },
        { label: 'Low Stock', value: `${stats.lowStockItems} Items`, icon: <AlertTriangle size={20} />, trend: 'Critical', positive: false, onClick: 'inventory' },
    ];

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            fill: true,
            label: 'Performance',
            data: chartDataState,
            borderColor: '#FF4D8D',
            backgroundColor: 'rgba(255, 77, 141, 0.1)',
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#FF4D8D',
            tension: 0.4,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#161B22', titleColor: '#8B949E', bodyColor: '#F0F6FC', borderWeight: 1, borderColor: 'rgba(255,255,255,0.1)' } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#8B949E', font: { size: 10 } } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8B949E', font: { size: 10 } } }
        },
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            {/* Welcome Hero */}
            <motion.div variants={item} className="relative overflow-hidden rounded-3xl premium-glass p-8 group min-h-[300px] flex items-center">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 w-full">
                    <div className="flex-1">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                            Good Morning, <span className="text-gradient">Bakery Admin</span>
                        </h2>
                        <p className="text-text-secondary mt-4 text-lg font-medium leading-relaxed max-w-lg">
                            MoodPop Bakery is performing <span className="text-emerald-400 font-bold">12% better</span> today. Your net settlement for this period is ready for review.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="btn-premium">View Full Report</button>
                            <button className="px-6 py-3 rounded-xl border border-border text-white font-semibold hover:bg-white/5 transition-all">Download CSV</button>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-72 h-72 shrink-0 float-animation">
                        <img
                            src="/bakery-hero.png"
                            alt="Luxury Cookies"
                            className="w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 scale-110 border border-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161B22]/60 to-transparent rounded-2xl"></div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {displayStats.map((stat, i) => (
                    <motion.div key={i} variants={item} onClick={() => stat.onClick && setActiveTab(stat.onClick)} className="premium-glass p-6 rounded-2xl group cursor-pointer border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <div className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {stat.positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-text-secondary text-sm font-semibold tracking-wide uppercase">{stat.label}</p>
                            <p className="text-3xl font-extrabold text-white mt-1">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <motion.div variants={item} className="lg:col-span-2 premium-glass p-8 rounded-3xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Settlement Trends</h3>
                        <select className="bg-white/5 border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary focus:outline-none">
                            <option>Last 7 Days</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="h-[350px] relative z-10">
                        <Line options={options} data={chartData} />
                    </div>
                </motion.div>

                {/* Actionable Alerts */}
                <motion.div variants={item} className="premium-glass p-8 rounded-3xl relative">
                    <h3 className="text-xl font-bold text-white mb-6">Inventory Radar</h3>
                    <div className="space-y-5">
                        {inventory.slice(0, 4).map((stock, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-10 rounded-full bg-${stock.color}-500/40 group-hover:scale-y-110 transition-transform`}></div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{stock.name}</p>
                                        <p className={`text-[10px] font-black uppercase tracking-widest text-${stock.color}-400`}>{stock.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-white font-bold">{stock.stock}{stock.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-border text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                        <Box size={16} />
                        <span>Manage All Stock</span>
                    </button>
                </motion.div>
            </div>

        </motion.div>
    );
};

export default Dashboard;
