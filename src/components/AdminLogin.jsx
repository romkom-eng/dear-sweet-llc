import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple hardcoded password for MVP: "sweetadmin26"
        if (password === 'sweetadmin26') {
            onLogin();
            navigate('/admin');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#11161D] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 text-text-secondary hover:text-white flex items-center gap-2 transition-colors z-20"
            >
                <Home size={20} /> Back to Store
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="premium-glass p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner">
                            <Lock size={28} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Admin Portal</h1>
                        <p className="text-text-secondary font-medium">Dear Sweet LLC Management</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Master Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter access key..."
                                className={`w-full h-14 bg-white/5 border ${error ? 'border-red-500' : 'border-white/10 focus:border-primary'} rounded-xl px-4 text-white font-bold transition-all focus:outline-none placeholder-text-secondary/50`}
                            />
                            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs font-bold mt-2">Incorrect password. Please try again.</motion.p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full h-14 bg-gradient-premium rounded-xl text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Log In Workspace <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                <p className="text-center text-text-secondary text-xs mt-8 font-medium">
                    Restricted Area. Unauthorized access is prohibited.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
