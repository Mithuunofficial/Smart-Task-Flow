import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-20 overflow-hidden" id="cta">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-purple/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-tr from-brand-purple/40 via-[#0d1127]/90 to-brand-blue/30 border border-white/10 shadow-2xl text-center overflow-hidden"
        >
          {/* Animated decorative shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none animate-pulse-slow" />

          {/* Sparkles / Zap floating indicators */}
          <div className="absolute top-8 left-8 p-2 rounded-xl bg-white/5 border border-white/5 animate-float hidden sm:block">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div className="absolute bottom-8 right-8 p-2 rounded-xl bg-white/5 border border-white/5 animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/10" />
          </div>

          {/* Banner Content */}
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              Ready to transform your productivity?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
              Join thousands of students and professionals who are getting more done with Smart Task Flow. Get started today in under two minutes.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/register"
                className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-xl shadow-brand-purple/20 hover:shadow-2xl hover:shadow-brand-purple/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Today
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Sub-text */}
            <p className="text-xs text-slate-500 font-medium pt-2">
              No credit card required. Cancel or change plans anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
