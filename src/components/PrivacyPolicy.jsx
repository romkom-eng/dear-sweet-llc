import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans">
            <header className="w-full bg-white/50 backdrop-blur-md border-b border-[#4A3B32]/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#4A3B32]/60 hover:text-[#4A3B32] font-bold transition-colors">
                        <ChevronLeft size={20} /> Back to Menu
                    </button>
                    <span className="font-black text-[#4A3B32] text-lg">Dear Sweet LLC</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-[#4A3B32] mb-3">Privacy Policy</h1>
                    <p className="text-[#4A3B32]/50 font-medium mb-12 text-sm">Last updated: March 8, 2025</p>

                    <div className="prose max-w-none space-y-10 text-[#4A3B32]/80 leading-relaxed">

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">1. Who We Are</h2>
                            <p>Dear Sweet LLC ("we," "our," or "us") is a small-batch artisan cookie company based in Orange County, California. We are committed to protecting your personal information and your right to privacy.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">2. Information We Collect</h2>
                            <p>When you submit an order inquiry through our website, we collect the following information:</p>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Order preferences (product, quantity, pickup date and time)</li>
                                <li>Any additional details or requests you choose to provide</li>
                            </ul>
                            <p>We do not collect or store any payment information on this website. All price quotations are handled privately.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">3. How We Use Your Information</h2>
                            <p>We use the information you provide solely to:</p>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li>Respond to your order inquiry and provide a price quote</li>
                                <li>Coordinate your order and pickup arrangements</li>
                                <li>Send you a confirmation email for your records</li>
                                <li>Contact you if there are any questions or changes regarding your order</li>
                            </ul>
                            <p>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">4. Third-Party Services</h2>
                            <p>We use <strong>EmailJS</strong> to process and deliver order inquiry notifications and confirmation emails. Your submitted information is transmitted through EmailJS solely for the purpose of email delivery. Please refer to <a href="https://www.emailjs.com/legal/privacy-policy/" className="text-[#8FA65B] underline" target="_blank" rel="noopener noreferrer">EmailJS's Privacy Policy</a> for details on how they handle data.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">5. Data Retention</h2>
                            <p>We retain your inquiry information only as long as necessary to fulfill your order and for reasonable record-keeping purposes. You may request deletion of your data at any time by contacting us directly.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">6. Your Rights</h2>
                            <p>You have the right to request access to, correction of, or deletion of your personal information at any time. To exercise these rights, please contact us at:</p>
                            <p className="font-bold text-[#4A3B32] bg-[#D1D9A7]/20 p-4 rounded-2xl">📧 dearsweet.llc@gmail.com</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">7. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <footer className="border-t border-[#4A3B32]/10 py-8 text-center text-[#4A3B32]/40 text-sm font-medium">
                © {new Date().getFullYear()} Dear Sweet LLC. All rights reserved.
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
