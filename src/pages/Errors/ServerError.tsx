import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 flex items-center justify-center p-4 selection:bg-brand-purple/30 selection:text-white">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
      
      {/* Glow Vignette Effect */}
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm glass-panel rounded-2xl p-8 border border-white/5 bg-brand-card text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-rose-500 to-brand-pink" />

        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold font-display text-white">500</h1>
          <h2 className="text-sm font-bold text-slate-200">AI Engine Crash Simulation</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our local intelligence node encountered an unexpected processing stack overflow. We are diagnosing.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="flex items-center gap-1.5 font-bold">
            <RefreshCw className="w-4 h-4" />
            Reload Workspace
          </span>
        </button>
      </motion.div>
    </div>
  );
}
