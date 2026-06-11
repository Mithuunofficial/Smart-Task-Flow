import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Register() {
  const navigate = useNavigate();
  const signUp = useStore((state) => state.signUp);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const { error: signUpErr } = await signUp(email, password, name);
      if (signUpErr) {
        setError(signUpErr.message || 'Failed to create space. Please try again.');
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 flex items-center justify-center p-4 selection:bg-brand-purple/30 selection:text-white">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
      
      {/* Glow Vignette Effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 group justify-center">
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
              <img src="/logo.png" className="w-10 h-10 object-contain" alt="" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-white">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Task Flow</span>
            </span>
          </Link>
          <h2 className="text-lg font-bold text-white mt-4">Create your account</h2>
          <p className="text-xs text-slate-400 mt-1">Get started free and start planning smarter today</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden bg-brand-card">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-blue" />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 text-left">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5 text-left">
              <label htmlFor="name" className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer pt-2"
            >
              {loading ? (
                <span>Registering your space...</span>
              ) : (
                <span className="flex items-center gap-1">
                  Create Space
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-purple font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
