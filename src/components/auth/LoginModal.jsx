import React, { useState } from 'react';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sans = "'Manrope', system-ui, sans-serif";
const serif = "'Cormorant Garamond', Georgia, serif";

const InputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: '#FDF6EC', border: '1px solid #e8d8ca', borderRadius: 4,
    padding: '13px 16px 13px 44px', color: '#2C1810', fontSize: '0.88rem',
    fontFamily: sans, outline: 'none', transition: 'border-color 0.2s',
};

function Field({ icon: Icon, ...props }) {
    return (
        <div style={{ position: 'relative', marginBottom: 16 }}>
            <Icon size={15} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
            <input style={InputStyle} {...props}
                onFocus={e => e.target.style.borderColor = '#C9A96E'}
                onBlur={e => e.target.style.borderColor = '#e8d8ca'} />
        </div>
    );
}

export default function LoginModal({ onClose }) {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

    const handleGoogle = async () => {
        setError('');
        try {
            await signInWithGoogle();
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (mode === 'login') {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(name, email, password);
            }
            onClose();
        } catch (e) {
            const msgs = {
                'auth/user-not-found': 'Email not found.',
                'auth/wrong-password': 'Incorrect password.',
                'auth/email-already-in-use': 'Email already registered. Please log in.',
                'auth/weak-password': 'Password must be at least 6 characters.',
                'auth/invalid-credential': 'Invalid email or password.',
            };
            setError(msgs[e.code] || e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,14,9,0.6)', zIndex: 300, backdropFilter: 'blur(4px)' }} />

            {/* Modal */}
            <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                zIndex: 301, background: '#FDF6EC', borderRadius: 4, width: '100%', maxWidth: 420,
                padding: '40px 36px', fontFamily: sans, boxShadow: '0 32px 80px rgba(26,14,9,0.35)',
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#a07840' }}>
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <h2 style={{ fontFamily: serif, fontSize: '1.8rem', color: '#2C1810', margin: '0 0 6px', fontWeight: 600 }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: '#a07840', fontSize: '0.82rem', margin: 0 }}>
                        {mode === 'login' ? 'Sign in to your account' : 'Join the Dear Sweet community'}
                    </p>
                </div>

                {/* Google */}
                <button onClick={handleGoogle} style={{
                    width: '100%', background: '#fff', border: '1px solid #e8d8ca', borderRadius: 4,
                    padding: '13px', fontSize: '0.85rem', fontWeight: 600, color: '#2C1810',
                    cursor: 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20,
                }}>
                    <Chrome size={18} color="#4285F4" />
                    Continue with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e8d8ca' }} />
                    <span style={{ fontSize: '0.72rem', color: '#a07840', letterSpacing: '0.08em' }}>OR</span>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e8d8ca' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <Field icon={User} type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                    )}
                    <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

                    {error && <p style={{ color: '#c0392b', fontSize: '0.8rem', marginBottom: 12 }}>{error}</p>}

                    <button type="submit" disabled={loading} style={{
                        width: '100%', background: '#C9A96E', color: '#2C1810', border: 'none', borderRadius: 4,
                        padding: '14px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em',
                        textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', fontFamily: sans,
                        opacity: loading ? 0.7 : 1, marginBottom: 16,
                    }}>
                        {loading ? '…' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6b4c35', margin: 0 }}>
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                        style={{ background: 'none', border: 'none', color: '#C9A96E', fontWeight: 700, cursor: 'pointer', fontFamily: sans }}>
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </>
    );
}
