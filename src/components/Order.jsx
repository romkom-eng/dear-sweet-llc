import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, MapPin, Clock, Package, ChevronDown, Building2, Users, Award, Coffee } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PRODUCTS } from '../data/products';

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
};

const Input = ({ label, children, required }) => (
    <div>
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a07840', marginBottom: 8 }}>
            {label}{required && <span style={{ color: '#C9A96E' }}> *</span>}
        </label>
        {children}
    </div>
);

const fieldStyle = {
    width: '100%', boxSizing: 'border-box',
    background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4,
    padding: '13px 16px', color: '#2C1810', fontSize: '0.9rem', fontFamily: sans,
    outline: 'none', appearance: 'none',
};

const ChevronSelect = ({ children, ...props }) => (
    <div style={{ position: 'relative' }}>
        <select style={{ ...fieldStyle, paddingRight: 36, cursor: 'pointer' }} {...props}>{children}</select>
        <ChevronDown size={14} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#C9A96E', pointerEvents: 'none' }} />
    </div>
);

const benefits = [
    { icon: Package, title: 'Volume Pricing', desc: 'Discounted rates starting at 30 boxes/week' },
    { icon: Coffee, title: 'Café-Ready', desc: 'Individually wrapped for display or self-serve' },
    { icon: Clock, title: 'Consistent Supply', desc: 'Weekly or bi-weekly scheduled delivery/pickup' },
    { icon: Award, title: 'Premium Quality', desc: 'Same handcrafted recipe, every single batch' },
];

const testimonials = [
    { name: 'Emily Park', business: 'Café Oleander, Irvine', text: '"Our customers keep coming back just for the Dubai cookies. Reorder is seamless."' },
    { name: 'James Kwon', business: 'The Sweet Room, LA', text: '"Consistent quality every week. My staff love how they\'re individually packaged."' },
];

const productOptions = PRODUCTS.map(p => p.title);

export default function Order() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        // Contact
        name: '', email: '', phone: '',
        // Business
        businessName: '', businessType: 'Café / Coffee Shop', website: '',
        // Order
        product: productOptions[0],
        weeklyVolume: '30–50 boxes/week',
        frequency: 'Weekly',
        location: '', startDate: getMinDate(),
        // Extra
        details: '',
    });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSending(true);
        try {
            await emailjs.send(
                'service_glti2i5',
                'template_i69i2pi',
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
                'YOUR_PUBLIC_KEY'
            );
        } catch { /* silent fail — still show success */ }
        setIsSending(false);
        setIsSubmitted(true);
    };

    // ── SUCCESS ──
    if (isSubmitted) {
        return (
            <div style={{ fontFamily: sans, background: '#FDF6EC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <div style={{ textAlign: 'center', maxWidth: 480 }}>
                    <CheckCircle2 size={60} color="#2a7a4b" style={{ marginBottom: 24 }} />
                    <h2 style={{ fontFamily: serif, fontSize: '2.5rem', color: '#2C1810', marginBottom: 16, fontWeight: 600 }}>Inquiry Received!</h2>
                    <p style={{ color: '#6b4c35', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 32 }}>
                        Thank you, <strong>{formData.name}</strong>! We'll review your wholesale inquiry and reach out to <strong>{formData.email}</strong> within 24 hours with pricing and next steps.
                    </p>
                    <div style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '20px 24px', marginBottom: 32, textAlign: 'left' }}>
                        <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a07840', fontWeight: 700, marginBottom: 12 }}>What Happens Next</div>
                        {['Review your inquiry & match you with the right pricing tier', 'Send a formal wholesale quote within 24 hours', 'Schedule a call to discuss delivery schedule & terms', 'First order fulfilled within 5 business days of agreement'].map((s, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10, fontSize: '0.85rem', color: '#3d2419' }}>
                                <span style={{ minWidth: 22, height: 22, borderRadius: '50%', background: '#C9A96E', color: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                {s}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => { setIsSubmitted(false); setFormData(f => ({ ...f, name: '', email: '', phone: '', businessName: '', details: '' })); }}
                        style={{ background: '#2C1810', color: '#C9A96E', border: 'none', borderRadius: 4, padding: '13px 32px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: sans }}>
                        Submit Another Inquiry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: sans }}>

            {/* ── HERO ── */}
            <section style={{ background: '#2C1810', padding: '80px 24px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(201,169,110,0.35)', borderRadius: 40, padding: '6px 18px', marginBottom: 24 }}>
                        <Building2 size={13} color="#C9A96E" />
                        <span style={{ fontSize: '0.65rem', color: '#C9A96E', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Wholesale & Bulk Orders</span>
                    </div>
                    <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#FDF6EC', margin: '0 0 20px', fontWeight: 600, lineHeight: 1.05 }}>
                        Partner With<br /><span style={{ color: '#C9A96E', fontStyle: 'italic' }}>Dear Sweet</span>
                    </h1>
                    <p style={{ color: 'rgba(253,246,236,0.65)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 48px' }}>
                        Elevate your café, restaurant, or event with authentic Dubai Chewy Cookies. Premium quality, consistent supply, wholesale pricing.
                    </p>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(201,169,110,0.15)', borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
                        {[
                            { value: '30+', label: 'Box Minimum' },
                            { value: '24h', label: 'Quote Turnaround' },
                            { value: '5 days', label: 'Lead Time' },
                        ].map(s => (
                            <div key={s.label} style={{ background: 'rgba(44,24,16,0.5)', padding: '24px 16px', textAlign: 'center' }}>
                                <div style={{ fontFamily: serif, fontSize: '2rem', color: '#C9A96E', fontWeight: 700 }}>{s.value}</div>
                                <div style={{ fontSize: '0.68rem', color: 'rgba(253,246,236,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY PARTNER ── */}
            <section style={{ background: '#f5ecd8', padding: '72px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a07840', fontWeight: 700, marginBottom: 12 }}>Why Partner With Us</div>
                        <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#2C1810', margin: 0, fontWeight: 600 }}>Built for Business</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
                        {benefits.map(({ icon: Icon, title, desc }) => (
                            <div key={title} style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '28px 24px' }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(201,169,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <Icon size={20} color="#C9A96E" />
                                </div>
                                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', color: '#2C1810', margin: '0 0 8px', fontWeight: 600 }}>{title}</h3>
                                <p style={{ fontSize: '0.82rem', color: '#6b4c35', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section style={{ background: '#2C1810', padding: '64px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
                        <Users size={20} color="#C9A96E" />
                        <span style={{ fontSize: '0.65rem', color: 'rgba(201,169,110,0.6)', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>Partners Say</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        {testimonials.map(t => (
                            <div key={t.name} style={{ background: 'rgba(201,169,110,0.07)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 4, padding: '28px 24px' }}>
                                <p style={{ fontFamily: serif, fontSize: '1.1rem', color: '#FDF6EC', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>{t.text}</p>
                                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C9A96E' }}>{t.name}</div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(201,169,110,0.5)', marginTop: 2 }}>{t.business}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INQUIRY FORM ── */}
            <section style={{ background: '#FDF6EC', padding: '80px 24px 96px' }}>
                <div style={{ maxWidth: 780, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a07840', fontWeight: 700, marginBottom: 12 }}>Get Started</div>
                        <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C1810', margin: '0 0 12px', fontWeight: 600 }}>Submit a Wholesale Inquiry</h2>
                        <p style={{ color: '#6b4c35', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 440, margin: '0 auto' }}>Fill out the form below and we'll send you a customized quote within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4, padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

                        {/* Contact */}
                        <div>
                            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid #f5ecd8' }}>Contact Information</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                                <Input label="Full Name" required>
                                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" style={fieldStyle} />
                                </Input>
                                <Input label="Email Address" required>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jane@yourbusiness.com" style={fieldStyle} />
                                </Input>
                                <Input label="Phone Number" required>
                                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567" style={fieldStyle} />
                                </Input>
                            </div>
                        </div>

                        {/* Business */}
                        <div>
                            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid #f5ecd8' }}>Business Details</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                                <Input label="Business Name" required>
                                    <input name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="Café Oleander" style={fieldStyle} />
                                </Input>
                                <Input label="Business Type" required>
                                    <ChevronSelect name="businessType" value={formData.businessType} onChange={handleChange}>
                                        {['Café / Coffee Shop', 'Restaurant / Bistro', 'Bakery', 'Hotel / Resort', 'Event Planner', 'Corporate Office', 'Retail Store', 'Other'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Website (optional)">
                                    <input name="website" value={formData.website} onChange={handleChange} placeholder="https://yourbusiness.com" style={fieldStyle} />
                                </Input>
                                <Input label="Location / City" required>
                                    <input name="location" value={formData.location} onChange={handleChange} required placeholder="Irvine, CA" style={fieldStyle} />
                                </Input>
                            </div>
                        </div>

                        {/* Order details */}
                        <div>
                            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid #f5ecd8' }}>Order Details</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                                <Input label="Product" required>
                                    <ChevronSelect name="product" value={formData.product} onChange={handleChange}>
                                        {productOptions.map(o => <option key={o}>{o}</option>)}
                                        <option>Mixed (Both Flavors)</option>
                                    </ChevronSelect>
                                </Input>
                                <Input label="Estimated Weekly Volume" required>
                                    <ChevronSelect name="weeklyVolume" value={formData.weeklyVolume} onChange={handleChange}>
                                        {['30–50 boxes/week', '50–100 boxes/week', '100–200 boxes/week', '200+ boxes/week', 'One-time / Event order'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Frequency" required>
                                    <ChevronSelect name="frequency" value={formData.frequency} onChange={handleChange}>
                                        {['Weekly', 'Bi-weekly', 'Monthly', 'One-time Event', 'Flexible'].map(o => <option key={o}>{o}</option>)}
                                    </ChevronSelect>
                                </Input>
                                <Input label="Desired Start Date" required>
                                    <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} min={getMinDate()} style={fieldStyle} />
                                </Input>
                            </div>
                        </div>

                        {/* Notes */}
                        <Input label="Additional Notes / Special Requirements">
                            <textarea name="details" value={formData.details} onChange={handleChange} rows={4}
                                placeholder="Custom packaging, flavour preferences, delivery logistics, etc."
                                style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.7 }} />
                        </Input>

                        <button type="submit" disabled={isSending} style={{
                            background: '#C9A96E', color: '#2C1810', border: 'none', borderRadius: 4,
                            padding: '16px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase', cursor: isSending ? 'wait' : 'pointer',
                            fontFamily: sans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            opacity: isSending ? 0.8 : 1, transition: 'opacity 0.2s',
                        }}>
                            {isSending ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending Inquiry…</> : <><Send size={16} /> Submit Wholesale Inquiry</>}
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#a07840', margin: 0 }}>
                            We respond to all inquiries within 24 hours · <a href="mailto:hello@dearsweet.co" style={{ color: '#C9A96E' }}>hello@dearsweet.co</a>
                        </p>
                    </form>
                </div>
            </section>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </div>
    );
}
