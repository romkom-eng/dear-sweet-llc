import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, MapPin, Clock, Package, ChevronDown, Building2, Users, Award, Coffee } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PRODUCTS } from '../data/products';

const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
};

const Input = ({ label, children, required }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent/80">
            {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
        {children}
    </div>
);

const fieldClasses = "w-full bg-white border border-secondary/20 rounded-xl px-4 py-3 text-text-light text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-light/30";

const ChevronSelect = ({ children, ...props }) => (
    <div className="relative">
        <select className={`${fieldClasses} appearance-none cursor-pointer pr-10`} {...props}>
            {children}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
    </div>
);

const benefits = [
    { icon: Package, title: 'Volume Pricing', desc: 'Discounted rates starting at 15 boxes' },
    { icon: Coffee, title: 'Café-Ready', desc: 'Individually wrapped for display or self-serve' },
    { icon: Clock, title: 'Consistent Supply', desc: 'Weekly or bi-weekly scheduled delivery/pickup' },
    { icon: Award, title: 'Premium Quality', desc: 'Same handcrafted recipe, every single batch' },
];

const testimonials = [
    { name: "Annie's Table", business: 'Irvine, CA', text: '"Our customers keep coming back just for the Dubai cookies. Reorder is seamless."' },
    { name: 'Verified Partner', business: 'The Sweet Room, LA', text: '"Consistent quality every week. My staff love how they\'re individually packaged."' },
];

const productOptions = PRODUCTS.map(p => p.title);

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_glti2i5';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_i69i2pi';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export default function Order() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        businessName: '', businessType: 'Café / Coffee Shop', website: '',
        product: productOptions[0],
        weeklyVolume: '30–50 boxes/week',
        frequency: 'Weekly',
        location: '', startDate: getMinDate(),
        details: '',
    });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSending(true);
        try {
            await emailjs.send(
                EMAILJS_SERVICE,
                EMAILJS_TEMPLATE,
                {
                    to_name: formData.name,
                    to_email: formData.email,
                    phone: formData.phone,
                    product: `${formData.product} — ${formData.weeklyVolume} (${formData.frequency})`,
                    quantity: formData.weeklyVolume,
                    location: formData.location,
                    date: formData.startDate,
                    time: 'B2B Wholesale Inquiry',
                    details: `Business: ${formData.businessName} (${formData.businessType})\nWebsite: ${formData.website}\nNotes: ${formData.details}`,
                },
                EMAILJS_PUBLIC_KEY
            );
        } catch (error) {
            console.error('EmailJS Error:', error);
        }
        setIsSending(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/5">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-text-light mb-4 tracking-tight">Inquiry Received!</h2>
                    <p className="text-text-light/70 mb-8 leading-relaxed">
                        Thank you, <span className="font-bold text-text-light">{formData.name}</span>! We'll review your wholesale inquiry and reach out to <span className="text-primary font-medium">{formData.email}</span> within 24 hours with pricing and next steps.
                    </p>

                    <div className="bg-background-light p-6 rounded-2xl text-left mb-8 space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2">Next Steps</h4>
                        {[
                            'Review your inquiry & match pricing tier',
                            'Send a formal quote within 24 hours',
                            'Schedule a logistics discovery call',
                            'First order fulfilled within 5 days'
                        ].map((s, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm text-text-light/80">
                                <span className="w-5 h-5 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                {s}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            setFormData(f => ({ ...f, name: '', email: '', phone: '', businessName: '', details: '' }));
                        }}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                        Submit Another Inquiry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* ── HERO ── */}
            <section className="relative pt-20 pb-16 px-6 bg-[#2A1F1F] text-white overflow-hidden lg:pt-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,163,115,0.1),transparent_60%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
                        <Building2 size={12} className="text-accent" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-accent">Wholesale & Business</span>
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-[1.05]">
                        Partner With <span className="text-accent italic">Dear Sweet</span>
                    </h1>
                    <p className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Elevate your café or event with authentic Dubai Chewy Cookies. Premium quality, consistent supply, and handcrafted care in every batch.
                    </p>

                    <div className="grid grid-cols-3 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                        {[
                            { value: '15+', label: 'Min Boxes' },
                            { value: '24h', label: 'Quote Speed' },
                            { value: '3d', label: 'Lead Time' },
                        ].map(s => (
                            <div key={s.label} className="p-6 text-center border-r border-white/10 last:border-r-0">
                                <div className="text-2xl lg:text-3xl font-display font-bold text-accent">{s.value}</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY PARTNER ── */}
            <section className="py-20 px-6 bg-background-light">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] mb-3 block">Why Choose Us</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-text-light tracking-tight">Built for Business</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                                    <Icon size={22} className="text-accent" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-text-light mb-2">{title}</h3>
                                <p className="text-text-light/60 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-20 px-6 bg-secondary/5 border-y border-secondary/10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-10 opacity-60">
                        <Users size={18} className="text-accent" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Partner Success</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map(t => (
                            <div key={t.name} className="relative p-8 bg-white/50 rounded-2xl border border-secondary/20">
                                <p className="text-lg lg:text-xl font-display text-text-light italic mb-6 leading-relaxed">"{t.text}"</p>
                                <div>
                                    <div className="font-bold text-text-light">{t.name}</div>
                                    <div className="text-xs text-accent uppercase font-bold tracking-widest mt-1">{t.business}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INQUIRY FORM ── */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] mb-3 block">Inquiry Form</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-text-light tracking-tight mb-4">Start Your Partnership</h2>
                        <p className="text-text-light/60">Fill out the form below for a customized wholesale quote within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 p-8 lg:p-12 bg-background-light rounded-[2.5rem] border border-secondary/10 shadow-sm">
                        {/* Contact */}
                        <div className="space-y-6">
                            <div className="border-b border-secondary/20 pb-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-widest">Contact Information</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Full Name" required>
                                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" className={fieldClasses} />
                                </Input>
                                <Input label="Email Address" required>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jane@business.com" className={fieldClasses} />
                                </Input>
                                <Input label="Phone Number" required>
                                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567" className={fieldClasses} />
                                </Input>
                            </div>
                        </div>

                        {/* Business */}
                        <div className="space-y-6">
                            <div className="border-b border-secondary/20 pb-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-widest">Business Details</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Business Name" required>
                                    <input name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="Café Oleander" className={fieldClasses} />
                                </Input>
                                <Input label="Business Type" required>
                                    <ChevronSelect name="businessType" value={formData.businessType} onChange={handleChange}>
                                        {['Café / Coffee Shop', 'Restaurant / Bistro', 'Bakery', 'Hotel', 'Office', 'Other'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Location" required>
                                    <input name="location" value={formData.location} onChange={handleChange} required placeholder="Irvine, CA" className={fieldClasses} />
                                </Input>
                            </div>
                        </div>

                        {/* Order */}
                        <div className="space-y-6">
                            <div className="border-b border-secondary/20 pb-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-widest">Volume & Frequency</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Preferred Product" required>
                                    <ChevronSelect name="product" value={formData.product} onChange={handleChange}>
                                        {productOptions.map(o => <option key={o}>{o}</option>)}
                                        <option>Mixed (Both Flavors)</option>
                                    </ChevronSelect>
                                </Input>
                                <Input label="Estimated Volume" required>
                                    <ChevronSelect name="weeklyVolume" value={formData.weeklyVolume} onChange={handleChange}>
                                        {['15 boxes/week', '30 boxes/week', '45+ boxes/week', 'Event Hire'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Inquiry Frequency" required>
                                    <ChevronSelect name="frequency" value={formData.frequency} onChange={handleChange}>
                                        {['Weekly', 'Bi-weekly', 'Monthly', 'One-time'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Start Date" required>
                                    <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} min={getMinDate()} className={fieldClasses} />
                                </Input>
                            </div>
                        </div>

                        {/* Notes */}
                        <Input label="Additional Notes">
                            <textarea name="details" value={formData.details} onChange={handleChange} rows={4}
                                placeholder="Packaging requests, specific logistics, etc."
                                className={`${fieldClasses} resize-none py-4`} />
                        </Input>

                        <button
                            type="submit"
                            disabled={isSending}
                            className={`w-full bg-primary text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all ${isSending ? 'opacity-80 cursor-wait' : 'hover:-translate-y-0.5'}`}
                        >
                            {isSending ? (
                                <><Loader2 size={20} className="animate-spin" /> Sending Inquiry…</>
                            ) : (
                                <><Send size={18} /> Submit Wholesale Inquiry</>
                            )}
                        </button>

                        <p className="text-center text-[11px] text-text-light/40">
                            Custom quotes are sent within 24 hours · <a href="mailto:info@dearsweetllc.com" className="text-primary hover:underline">info@dearsweetllc.com</a>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}
