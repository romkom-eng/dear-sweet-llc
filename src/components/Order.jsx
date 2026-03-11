import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const getMinDate = () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    return minDate.toISOString().split('T')[0];
};

const Order = () => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        product: 'Original Dubai Chewy',
        quantity: '15 Boxes (Minimum)',
        location: 'Irvine, CA (HQ)',
        date: getMinDate(),
        time: '12:00',
        details: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const SERVICE_ID = 'service_glti2i5';
        const TEMPLATE_ID = 'template_i69i2pi';
        const PUBLIC_KEY = 'ZKLV3o3AltwRoZ2-_';

        const templateParams = {
            to_name: formData.name,
            to_email: formData.email,
            phone: formData.phone,
            product: formData.product,
            quantity: formData.quantity,
            pickup_location: formData.location,
            pickup_date: formData.date,
            pickup_time: formData.time,
            message: formData.details
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Email sending failed:', error);
            alert("Sorry, there was an error sending your request. Please try again or contact us directly.");
        } finally {
            setIsSending(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-[#4A3B32]/10"
                >
                    <div className="w-20 h-20 bg-[#D1D9A7]/30 rounded-full flex items-center justify-center mx-auto mb-8 text-[#8FA65B]">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-[#4A3B32] mb-4">Request Sent!</h2>
                    <p className="text-[#4A3B32]/70 font-medium mb-8 leading-relaxed">
                        Thank you for your interest in Dear Sweet LLC. Our team will review your order inquiry and contact you shortly with a price quote.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-[#4A3B32] text-white rounded-2xl font-bold hover:bg-[#5C4B40] transition-colors"
                    >
                        Return to Shop
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans">
            {/* Header */}
            <header className="w-full bg-white/50 backdrop-blur-md border-b border-[#4A3B32]/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#4A3B32]/60 hover:text-[#4A3B32] font-bold transition-colors">
                        <ChevronLeft size={20} /> Back to Menu
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-[#4A3B32] mb-4">Order Inquiry</h1>
                    <p className="text-lg text-[#4A3B32]/60 font-medium">
                        Please fill out the form below to request a price quote for your event or order.<br />
                        <span className="text-[#E63946] font-bold text-sm mt-2 block">* Orange County pickup only. Other areas are delivery only.</span>
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_20px_60px_rgba(74,59,50,0.05)] border border-[#4A3B32]/5 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Full Name</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Email Address</label>
                                <input
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="jane@example.com"
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Phone Number</label>
                                <input
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Select Product</label>
                                <select
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all appearance-none"
                                >
                                    <option>Original Dubai Chewy</option>
                                    <option>Strawberry Dubai Chewy</option>
                                    <option>Assorted Box (Both)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Estimated Quantity</label>
                                <select
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all appearance-none"
                                >
                                    <option>15 Boxes (Minimum)</option>
                                    <option>30 Boxes</option>
                                    <option>45 Boxes</option>
                                    <option>60+ Boxes (Event)</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Pickup Neighborhood</label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all appearance-none"
                                >
                                    <option>Irvine, CA (HQ)</option>
                                    <option>Newport Beach, CA</option>
                                    <option>Costa Mesa, CA</option>
                                    <option>Tustin, CA</option>
                                    <option>Santa Ana, CA</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Pickup Date</label>
                                <input
                                    required
                                    name="date"
                                    type="date"
                                    min={getMinDate()}
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Pickup Time</label>
                                <input
                                    required
                                    name="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-[#FAF8F5] rounded-2xl px-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-[#4A3B32]/40 uppercase tracking-widest">Additional Details</label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Tell us more about your needs..."
                                className="w-full bg-[#FAF8F5] rounded-3xl p-6 text-[#4A3B32] font-bold focus:outline-none focus:ring-2 focus:ring-[#D1D9A7] transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            disabled={isSending}
                            type="submit"
                            className="w-full py-5 bg-[#4A3B32] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#5C4B40] hover:shadow-xl transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isSending ? (
                                <><Loader2 size={20} className="animate-spin" /> Processing...</>
                            ) : (
                                <>Submit Inquiry <Send size={20} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default Order;
