import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
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
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 group justify-center">
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
              <img src="/logo.png" className="w-10 h-10 object-contain" alt="" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-white">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Task Flow</span>
            </span>
          </Link>
          <h2 className="text-lg font-bold text-white mt-4">Reset password</h2>
          <p className="text-xs text-slate-400 mt-1">We will email you a secure link to reset your password</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden bg-brand-card">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-blue" />
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending email...</span>
                ) : (
                  <span className="flex items-center gap-1">
                    Send Reset Link
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/25">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-white">Reset Link Sent</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                We have sent an email to <span className="text-white font-medium">{email}</span> containing instructions to reset your account password.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-brand-purple hover:underline"
              >
                Change email address
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
