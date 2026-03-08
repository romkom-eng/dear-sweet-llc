import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ChevronRight, Lock } from 'lucide-react';

const Storefront = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans selection:bg-[#D1D9A7] selection:text-[#4A3B32] overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#4A3B32]/10 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black tracking-tighter text-[#4A3B32]">
                        Dear Sweet <span className="text-[#D1D9A7]">LLC</span>
                    </motion.div>
                    <nav className="hidden md:flex space-x-8 text-sm font-bold text-[#4A3B32]/60 uppercase tracking-widest">
                        <a href="#about" className="hover:text-[#4A3B32] transition-colors">Our Story</a>
                        <a href="#menu" className="hover:text-[#4A3B32] transition-colors">Menu</a>
                        <button onClick={() => navigate('/admin')} className="hover:text-primary transition-colors flex items-center gap-1">
                            <Lock size={14} /> Admin
                        </button>
                    </nav>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/order')}
                        className="bg-[#4A3B32] text-[#FAF8F5] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#5C4B40] transition-colors hover:scale-105 active:scale-95"
                    >
                        <ShoppingBag size={18} />
                        Order Now
                    </motion.button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[#D1D9A7]/40 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[40%] -left-[20%] w-[600px] h-[600px] bg-[#E63946]/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col lg:flex-row items-center gap-16"
                    >
                        {/* Hero Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#D1D9A7]/30 text-[#4A3B32] font-black text-xs uppercase tracking-[0.2em] mb-6">
                                The Original
                            </motion.div>
                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-[#4A3B32] leading-[1.1] tracking-tight mb-8">
                                The New Standard of<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1D9A7] to-[#8FA65B]">Dubai Chewy Cookies</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-[#4A3B32]/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Crispy on the outside, delightfully chewy signature marshmallow on the inside.<br />
                                The perfect harmony of premium roasted pistachio and crispy kadaif.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button onClick={() => navigate('/order')} className="w-full sm:w-auto px-8 py-5 bg-[#4A3B32] text-[#FAF8F5] rounded-full font-black text-lg hover:shadow-[0_10px_40px_rgba(74,59,50,0.3)] hover:-translate-y-1 transition-all duration-300">
                                    Order Now
                                </button>
                                <button className="w-full sm:w-auto px-8 py-5 bg-transparent border-2 border-[#4A3B32]/20 text-[#4A3B32] rounded-full font-black text-lg hover:border-[#4A3B32] transition-all duration-300 flex items-center justify-center gap-2 group">
                                    Read Our Story
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-[#4A3B32]/60 font-bold text-sm">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FAF8F5] bg-[#D1D9A7] flex items-center justify-center text-xs">⭐</div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-[#E63946]"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                                    <span>4.9/5 Average Rating</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Hero Images (Mockup based on user description) */}
                        <motion.div variants={fadeInUp} className="flex-1 relative w-full aspect-square max-w-[600px] mx-auto">
                            {/* Original */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[#D1D9A7]/20 rounded-full shadow-2xl backdrop-blur-sm border border-[#D1D9A7]/40 flex flex-col items-center justify-center p-6 z-20 group"
                            >
                                <h3 className="text-2xl font-black text-[#4A3B32] mb-2 text-center">Original<br />Dubai Chewy</h3>
                                <div className="absolute inset-0 bg-cover bg-center rounded-full opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800")' }}></div>
                                <span className="bg-[#4A3B32] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-4">Pistachio + Kadaif</span>
                            </motion.div>

                            {/* Strawberry */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-[5%] left-[5%] w-[55%] h-[55%] bg-[#E63946]/10 rounded-full shadow-2xl backdrop-blur-sm border border-[#E63946]/20 flex flex-col items-center justify-center p-6 z-10 group"
                            >
                                <h3 className="text-xl font-black text-[#E63946] mb-2 text-center">Strawberry<br />Dubai Chewy</h3>
                                <span className="bg-[#E63946] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-4">Whole Strawberry</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Section */}
            <section id="menu" className="py-32 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#4A3B32] mb-6">Signature Lineup</h2>
                        <p className="text-lg text-[#4A3B32]/60 font-medium max-w-2xl mx-auto">
                            Handcrafted fresh every morning. We perfectly recreated the sweet and crispy Middle Eastern flavors enveloped in our signature chewy marshmallow texture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Item 1 */}
                        <motion.div whileHover={{ y: -10 }} className="bg-[#FAF8F5] rounded-[3rem] p-10 lg:p-14 border border-[#4A3B32]/5 group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(74,59,50,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D1D9A7]/20 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black text-[#4A3B32] mb-4">Original<br />Dubai Chewy Cookie</h3>
                                <p className="text-[#4A3B32]/70 font-medium leading-relaxed mb-8 h-20">
                                    Our original best-seller filled with premium pistachio spread and crispy kadaif, enveloped in fluffy marshmallow.
                                </p>
                                <div className="text-xl font-bold text-[#8FA65B] mb-8 uppercase tracking-widest">Contact for Price Quote</div>
                                <button onClick={() => navigate('/order')} className="w-full py-4 bg-[#8FA65B]/10 text-[#8FA65B] rounded-2xl font-bold uppercase tracking-widest hover:bg-[#8FA65B] hover:text-white transition-colors">
                                    Order Inquiry
                                </button>
                            </div>
                        </motion.div>

                        {/* Item 2 */}
                        <motion.div whileHover={{ y: -10 }} className="bg-[#FAF8F5] rounded-[3rem] p-10 lg:p-14 border border-[#4A3B32]/5 group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(74,59,50,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946]/10 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black text-[#4A3B32] mb-4">Strawberry<br />Dubai Chewy Cookie</h3>
                                <p className="text-[#4A3B32]/70 font-medium leading-relaxed mb-8 h-20">
                                    The perfect balance of sweet and crispy original flavors with a hidden whole strawberry inside for a refreshing burst of juice.
                                </p>
                                <div className="text-xl font-bold text-[#E63946] mb-8 uppercase tracking-widest">Contact for Price Quote</div>
                                <button onClick={() => navigate('/order')} className="w-full py-4 bg-[#E63946]/10 text-[#E63946] rounded-2xl font-bold uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-colors">
                                    Order Inquiry
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#4A3B32] text-[#FAF8F5] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="text-xl font-black tracking-tighter mb-1">Dear Sweet LLC</div>
                        <p className="text-[#FAF8F5]/50 text-sm font-medium">Orange County, California</p>
                    </div>
                    <nav className="flex items-center gap-8 text-sm font-bold text-[#FAF8F5]/60">
                        <button onClick={() => navigate('/privacy')} className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</button>
                        <button onClick={() => navigate('/terms')} className="hover:text-[#FAF8F5] transition-colors">Terms & Conditions</button>
                        <button onClick={() => navigate('/order')} className="hover:text-[#FAF8F5] transition-colors">Order Inquiry</button>
                    </nav>
                    <p className="text-[#FAF8F5]/30 text-xs font-medium">© {new Date().getFullYear()} Dear Sweet LLC. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Storefront;
