import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  BrainCircuit, 
  Layers, 
  Clock3, 
  Flame, 
  Sparkles,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface EngineFeature {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function AIEngine() {
  // Simulator states for interactive panel
  const [urgency, setUrgency] = useState<'today' | 'week' | 'month'>('today');
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('medium');
  const [energy, setEnergy] = useState<'high' | 'low'>('high');

  // Calculate live results based on simulator selections
  const calculateMetrics = () => {
    let weight = 50;
    let boost = 10;
    let category = 'Medium Priority';
    let suggestion = 'Schedule for post-lunch block.';

    if (urgency === 'today') {
      weight += 30;
      boost += 15;
    } else if (urgency === 'week') {
      weight += 15;
      boost += 5;
    }

    if (complexity === 'high') {
      weight += 15;
    } else if (complexity === 'low') {
      weight -= 10;
    }

    if (energy === 'high') {
      boost += 12;
    } else {
      boost -= 5;
    }

    // Boundaries
    weight = Math.min(Math.max(weight, 15), 98);
    boost = Math.min(Math.max(boost, 5), 38);

    if (weight >= 75) {
      category = 'Critical Priority';
      suggestion = 'Do immediately during peak energy focus window.';
    } else if (weight <= 35) {
      category = 'Low Priority';
      suggestion = 'Defer to end-of-day or automate via workflow integrations.';
    }

    return { weight, boost, category, suggestion };
  };

  const { weight, boost, category, suggestion } = calculateMetrics();

  const engineFeatures: EngineFeature[] = [
    {
      title: 'Task Priority Detection',
      desc: 'Context-aware evaluation analyzes task language, tags, and dependencies to predict exact priority status.',
      icon: <BrainCircuit className="w-5 h-5 text-violet-400" />
    },
    {
      title: 'Deadline Analysis',
      desc: 'Predictive modeling identifies bottleneck deadlines early, providing automated task rescheduling nudges.',
      icon: <Clock3 className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Productivity Scoring',
      desc: 'Monitors focus habits and task completion frequencies to generate custom circadian energy graphs.',
      icon: <Layers className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Smart Recommendations',
      desc: 'Offers adaptive tips, matching high-complexity tasks with high energy windows for peak focus.',
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Daily Optimization',
      desc: 'Runs automated sweeping scripts every morning to optimize your task order for maximum efficiency.',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <section className="relative py-24 bg-dot-pattern" id="ai-engine">
      {/* Decorative glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
            AI Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
            Next-gen automation at your fingertips
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Smart Task Flow utilizes neural task structures to dynamically adjust your plan in real-time.
          </p>
        </div>

        {/* Futuristic Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel - Live Simulator (Interactive) */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 rounded-2xl p-1 bg-gradient-to-br from-indigo-500/10 via-violet-500/20 to-cyan-500/10 border border-white/10 shadow-2xl relative flex flex-col justify-between overflow-hidden"
          >
            {/* Animated glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/5 via-transparent to-brand-blue/5 animate-pulse-slow" />

            <div className="rounded-xl glass-panel-heavy p-6 flex-1 flex flex-col justify-between space-y-6 z-10">
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-violet-400">
                  <Cpu className="w-5 h-5 text-brand-purple animate-pulse" />
                  <h3 className="text-lg font-bold text-white font-display">Live AI Priority Simulator</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Modify the variables below to watch the task scheduler determine the optimized flow state in real-time.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4 text-left">
                {/* 1. Urgency */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-400">1. Deadline Urgency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['today', 'week', 'month'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setUrgency(opt)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          urgency === opt 
                            ? 'bg-brand-purple/20 border-brand-purple text-white shadow-md shadow-brand-purple/15' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {opt === 'today' ? 'Due Today' : opt === 'week' ? 'Due This Week' : 'Due This Month'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Complexity */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-400">2. Task Complexity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setComplexity(opt)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          complexity === opt 
                            ? 'bg-brand-blue/20 border-brand-blue text-white shadow-md shadow-brand-blue/15' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)} Effort
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Energy */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-400">3. Focus Energy level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['high', 'low'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setEnergy(opt)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          energy === opt 
                            ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md shadow-emerald-500/15' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {opt === 'high' ? '⚡ High Focus' : '🔋 Rest / Low Focus'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results display */}
              <div className="p-4 rounded-xl border border-white/5 bg-slate-950/60 flex flex-col justify-between gap-4 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">AI Priority Weight</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                      {weight}%
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-400 block">Schedule Efficiency Boost</span>
                    <span className="text-xl font-bold text-emerald-400 flex items-center justify-end gap-1">
                      <Flame className="w-4 h-4 fill-emerald-500/10" />
                      +{boost}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {weight >= 75 ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                    <span className={`text-xs font-bold ${
                      weight >= 75 
                        ? 'text-rose-400' 
                        : weight <= 35 
                          ? 'text-slate-400' 
                          : 'text-amber-400'
                    }`}>
                      {category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {suggestion}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Bullet Feature cards */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between gap-4"
          >
            {engineFeatures.map((feat, index) => (
              <div
                key={index}
                className="glass-panel p-4 rounded-xl border border-white/5 flex gap-4 text-left glass-card-hover group relative overflow-hidden"
              >
                {/* Glowing Node Dot (Decoration) */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-purple/20 group-hover:bg-brand-purple transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_8px_#7c3aed]" />
                
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 group-hover:scale-105 transition-transform duration-300">
                  {feat.icon}
                </div>
                
                <div className="space-y-1 flex-1 pr-4">
                  <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
