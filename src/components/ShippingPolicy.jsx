import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ShippingPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#4A3B32]">
            <header className="w-full bg-white/50 backdrop-blur-md border-b border-[#4A3B32]/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#4A3B32]/60 hover:text-[#4A3B32] font-bold transition-colors">
                        <ChevronLeft size={20} /> Back to Home
                    </button>
                    <span className="font-black text-lg">Dear Sweet LLC</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold mb-3">Shipping Policy</h1>
                    <p className="text-[#4A3B32]/50 font-medium mb-12 text-sm">Last updated: March 16, 2026</p>

                    <div className="prose max-w-none space-y-10 leading-relaxed">
                        <section className="space-y-3">
                            <h2 className="text-xl font-black">1. Processing Time</h2>
                            <p>All orders are processed within 3 days. Orders are not shipped or delivered on weekends or holidays.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black">2. Local Pickup</h2>
                            <p>Local pickup is available in Irvine, CA. You will receive an email notification when your order is ready for pickup.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black">3. Delivery</h2>
                            <p>We offer local delivery within Orange County for a fixed fee. Nationwide shipping is currently available for selected products.</p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ShippingPolicy;
