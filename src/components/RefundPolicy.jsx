import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RefundPolicy = () => {
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
                    <h1 className="text-4xl font-extrabold mb-3">Refund Policy</h1>
                    <p className="text-[#4A3B32]/50 font-medium mb-12 text-sm">Last updated: March 16, 2026</p>

                    <div className="prose max-w-none space-y-10 leading-relaxed">
                        <section className="space-y-3">
                            <h2 className="text-xl font-black">1. Overview</h2>
                            <p>Because our products are perishable and custom-baked to order, we generally do not offer returns. However, your satisfaction is our priority.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black">2. Damages and Issues</h2>
                            <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black">3. Refunds</h2>
                            <p>If a refund is approved, it will be processed through the original payment method or as store credit. Please remember it can take some time for your bank or credit card company to process and post the refund.</p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default RefundPolicy;
