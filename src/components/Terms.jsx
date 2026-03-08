import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Terms = () => {
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
                    <h1 className="text-4xl font-extrabold text-[#4A3B32] mb-3">Terms & Conditions</h1>
                    <p className="text-[#4A3B32]/50 font-medium mb-12 text-sm">Last updated: March 8, 2025</p>

                    <div className="prose max-w-none space-y-10 text-[#4A3B32]/80 leading-relaxed">

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">1. Agreement to Terms</h2>
                            <p>By submitting an order inquiry through the Dear Sweet LLC website, you agree to these Terms & Conditions. These terms apply to all customers and visitors of our site.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">2. Ordering & Minimum Order Requirements</h2>
                            <ul className="list-disc pl-6 space-y-2 font-medium">
                                <li>All orders are submitted as <strong>inquiries only</strong>. An order is not confirmed until you receive a written confirmation from Dear Sweet LLC.</li>
                                <li>A minimum order of <strong>15 boxes</strong> is required per transaction.</li>
                                <li>Orders must be placed at least <strong>3 days in advance</strong> of the requested pickup or delivery date.</li>
                                <li>Pricing is provided upon inquiry and may vary based on quantity, product selection, and delivery requirements.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">3. Pickup & Delivery</h2>
                            <ul className="list-disc pl-6 space-y-2 font-medium">
                                <li><strong>Pickup orders:</strong> Available within <strong>Orange County, California</strong> only. Pickup location will be confirmed upon order acceptance.</li>
                                <li><strong>Delivery orders:</strong> Available for customers outside of Orange County. Delivery fees and logistics will be discussed and agreed upon prior to order confirmation.</li>
                                <li>Dear Sweet LLC is not liable for delays caused by circumstances outside our control once a delivery has been handed off to a third-party delivery service.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">4. Cancellations & Refunds</h2>
                            <ul className="list-disc pl-6 space-y-2 font-medium">
                                <li>Cancellations must be requested at least <strong>48 hours</strong> before the scheduled pickup or delivery date.</li>
                                <li>Cancellations made less than 48 hours in advance may be subject to a cancellation fee.</li>
                                <li>Refunds are issued at the discretion of Dear Sweet LLC. We are committed to customer satisfaction and will do our best to resolve any issues promptly.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">5. Food Allergen Disclaimer</h2>
                            <div className="bg-[#E63946]/5 border border-[#E63946]/20 rounded-2xl p-5 space-y-2">
                                <p className="font-bold text-[#4A3B32]">⚠️ Important Allergen Notice</p>
                                <p>Our products contain or may contain the following common allergens:</p>
                                <ul className="list-disc pl-6 space-y-1 font-medium">
                                    <li><strong>Tree Nuts</strong> — Pistachio</li>
                                    <li><strong>Gluten / Wheat</strong> — Kadaif (shredded wheat pastry)</li>
                                    <li><strong>Dairy</strong> — Butter, cream</li>
                                    <li><strong>Eggs</strong></li>
                                </ul>
                                <p className="text-sm mt-2">Our products are made in a shared kitchen environment where cross-contamination may occur. Please inform us of any severe allergies before placing your order. Customers with severe food allergies consume our products at their own risk.</p>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">6. Product Quality & Freshness</h2>
                            <ul className="list-disc pl-6 space-y-2 font-medium">
                                <li>All Dear Sweet LLC cookies are made fresh to order. We do not use preservatives.</li>
                                <li>Cookies are best consumed within <strong>3 days</strong> of the pickup or delivery date when stored at room temperature, or within <strong>7 days</strong> when refrigerated.</li>
                                <li>We are not responsible for food quality if products are stored improperly by the customer.</li>
                            </ul>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">7. Intellectual Property</h2>
                            <p>All content on this website, including recipes, product descriptions, logos, and imagery, is the property of Dear Sweet LLC and may not be reproduced or used without written permission.</p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-black text-[#4A3B32]">8. Contact Us</h2>
                            <p>Questions about these terms? Reach us at:</p>
                            <p className="font-bold text-[#4A3B32] bg-[#D1D9A7]/20 p-4 rounded-2xl">📧 dearsweet.llc@gmail.com</p>
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

export default Terms;
