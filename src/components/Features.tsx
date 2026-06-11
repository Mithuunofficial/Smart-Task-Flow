import { motion } from 'framer-motion';
import { 
  Brain, 
  CalendarRange, 
  LineChart, 
  Users2, 
  CheckSquare, 
  BellRing 
} from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function Features() {
  const features: FeatureItem[] = [
    {
      title: 'AI Task Prioritization',
      description: 'Smart AI analyzes your tasks and priorities to help you focus on what matters most.',
      icon: <Brain className="w-6 h-6 text-violet-400" />,
      gradient: 'from-violet-600/20 to-fuchsia-600/10'
    },
    {
      title: 'Smart Scheduling',
      description: 'Auto-schedule tasks based on your availability, deadlines, and optimal focus times.',
      icon: <CalendarRange className="w-6 h-6 text-indigo-400" />,
      gradient: 'from-indigo-600/20 to-blue-600/10'
    },
    {
      title: 'Progress Analytics',
      description: 'Beautiful visual charts and reports to track your productivity levels and build positive habits.',
      icon: <LineChart className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-600/20 to-teal-600/10'
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with shared boards, real-time assignment, and sync notifications.',
      icon: <Users2 className="w-6 h-6 text-cyan-400" />,
      gradient: 'from-cyan-600/20 to-brand-blue/10'
    },
    {
      title: 'Habit Tracking',
      description: 'Establish routines, track consistency metrics over time, and build streaks for lasting discipline.',
      icon: <CheckSquare className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-600/20 to-orange-600/10'
    },
    {
      title: 'Reminder Notifications',
      description: 'Never miss deadlines or milestones with smart alerts, email digests, and desktop notifications.',
      icon: <BellRing className="w-6 h-6 text-rose-400" />,
      gradient: 'from-rose-600/20 to-pink-600/10'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden" id="features">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brand-purple"
          >
            Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
          >
            Everything you need to stay ahead
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Powerful features designed to simplify your workflow and maximize your productivity.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-panel p-6 rounded-2xl text-left glass-card-hover flex flex-col justify-between min-h-[200px] relative group"
            >
              {/* Card top half */}
              <div className="space-y-4">
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.gradient} border border-white/5 shadow-inner`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                {feature.description}
              </p>

              {/* Soft Ambient Inner Glow on Card hover (handled in CSS class `.glass-card-hover`) */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
