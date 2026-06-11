import { Users, CheckCircle, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function Stats() {
  const stats: StatItem[] = [
    {
      value: '1,000+',
      label: 'Happy Users',
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      gradient: 'from-indigo-500/20 to-brand-blue/10'
    },
    {
      value: '25K+',
      label: 'Tasks Completed',
      icon: <CheckCircle className="w-5 h-5 text-violet-400" />,
      gradient: 'from-brand-purple/20 to-purple-500/10'
    },
    {
      value: '98%',
      label: 'Productivity Boost',
      icon: <Zap className="w-5 h-5 text-amber-400 fill-amber-400/10" />,
      gradient: 'from-amber-500/20 to-orange-500/10'
    },
    {
      value: '99.9%',
      label: 'Secure Data',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      gradient: 'from-cyan-500/20 to-brand-blue/10'
    }
  ];

  return (
    <section className="relative py-12 border-y border-white/5 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl glass-panel hover:bg-white/5 transition-all duration-300 group"
            >
              {/* Icon container */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr ${stat.gradient} border border-white/5 group-hover:scale-105 transition-transform duration-300`}>
                {stat.icon}
              </div>
              
              {/* Value & Label */}
              <div className="text-left">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
