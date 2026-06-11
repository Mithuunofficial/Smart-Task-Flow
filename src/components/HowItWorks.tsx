import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Check, 
  Sparkles,
  ClipboardList,
  Cpu,
  Clock
} from 'lucide-react';

interface TimelineStep {
  num: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const steps: TimelineStep[] = [
    {
      num: 1,
      icon: <ClipboardList className="w-5 h-5 text-indigo-400" />,
      title: 'Add Your Tasks',
      description: 'Quickly capture tasks from anywhere and never miss anything important.'
    },
    {
      num: 2,
      icon: <BrainCircuit className="w-5 h-5 text-violet-400" />,
      title: 'AI Organizes Workflow',
      description: 'Our AI analyzes, prioritizes, and creates the perfect flow for you.'
    },
    {
      num: 3,
      icon: <Check className="w-5 h-5 text-emerald-400" />,
      title: 'Complete Efficiently',
      description: 'Focus on your work while Smart Task Flow keeps you on track.'
    }
  ];

  return (
    <section className="relative py-24 bg-slate-950/10 border-t border-white/5" id="workflow">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column - Vertical Timeline */}
          <div className="lg:col-span-5 text-left flex flex-col space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                Smart flow.<br />
                Better productivity.
              </h2>
            </div>

            {/* Vertical Steps */}
            <div className="space-y-8 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-slate-800" />

              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-4 relative group"
                >
                  {/* Glowing bubble index wrapper */}
                  <div className="relative z-10 flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 border border-slate-700 group-hover:border-brand-purple transition-colors duration-300">
                    <div className="absolute inset-0.5 rounded-full bg-slate-950 flex items-center justify-center font-display text-xs font-bold text-slate-300">
                      {step.num}
                    </div>
                  </div>

                  {/* Icon and content */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-white/5 border border-white/5 group-hover:scale-105 transition-transform">
                        {step.icon}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-purple transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Workflow Diagram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            {/* Visual Panel Card */}
            <div className="w-full rounded-2xl p-1 bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="rounded-xl glass-panel-heavy p-6 h-[400px] relative overflow-hidden">
                
                {/* SVG Connections Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 400">
                  {/* Left task node connections (to AI Engine at [300, 185]) */}
                  {/* Task 1 [150, 65] */}
                  <path d="M 175 65 C 230 65, 230 185, 275 185" fill="none" stroke="url(#blue-purple-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 175 65 C 230 65, 230 185, 275 185" fill="none" stroke="url(#glow-gradient-1)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />
                  
                  {/* Task 2 [150, 145] */}
                  <path d="M 175 145 C 220 145, 230 185, 275 185" fill="none" stroke="url(#blue-purple-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 175 145 C 220 145, 230 185, 275 185" fill="none" stroke="url(#glow-gradient-1)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Task 3 [150, 225] */}
                  <path d="M 175 225 C 220 225, 230 185, 275 185" fill="none" stroke="url(#blue-purple-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 175 225 C 220 225, 230 185, 275 185" fill="none" stroke="url(#glow-gradient-1)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Task 4 [150, 305] */}
                  <path d="M 175 305 C 230 305, 230 185, 275 185" fill="none" stroke="url(#blue-purple-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 175 305 C 230 305, 230 185, 275 185" fill="none" stroke="url(#glow-gradient-1)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Right schedule node connections (from AI Engine at [325, 185]) */}
                  {/* Schedule 1 [425, 80] */}
                  <path d="M 325 185 C 370 185, 380 80, 425 80" fill="none" stroke="url(#purple-blue-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 325 185 C 370 185, 380 80, 425 80" fill="none" stroke="url(#glow-gradient-2)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Schedule 2 [425, 140] */}
                  <path d="M 325 185 C 370 185, 380 140, 425 140" fill="none" stroke="url(#purple-blue-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 325 185 C 370 185, 380 140, 425 140" fill="none" stroke="url(#glow-gradient-2)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Schedule 3 [425, 200] */}
                  <path d="M 325 185 C 370 185, 380 200, 425 200" fill="none" stroke="url(#purple-blue-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 325 185 C 370 185, 380 200, 425 200" fill="none" stroke="url(#glow-gradient-2)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Schedule 4 [425, 260] */}
                  <path d="M 325 185 C 370 185, 380 260, 425 260" fill="none" stroke="url(#purple-blue-gradient)" strokeWidth="1.5" className="opacity-40" />
                  <path d="M 325 185 C 370 185, 380 260, 425 260" fill="none" stroke="url(#glow-gradient-2)" strokeWidth="2" strokeDasharray="6 30" className="animate-flow-line" />

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="purple-blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="glow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="glow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Content Elements (Absolute overlays) */}
                <div className="absolute inset-0 flex items-center justify-between p-6">
                  
                  {/* Raw Tasks Stack */}
                  <div className="flex flex-col gap-3 w-40 z-20">
                    {/* Task Item 1 */}
                    <div className="p-2.5 rounded-lg border border-white/5 glass-panel bg-slate-900/60 flex items-center justify-between text-left">
                      <span className="text-[10px] font-semibold text-white truncate">UI/UX Design</span>
                      <span className="text-[8px] font-bold text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/10">High</span>
                    </div>

                    {/* Task Item 2 */}
                    <div className="p-2.5 rounded-lg border border-white/5 glass-panel bg-slate-900/60 flex items-center justify-between text-left">
                      <span className="text-[10px] font-semibold text-white truncate">Team Meeting</span>
                      <span className="text-[8px] font-bold text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/10">Medium</span>
                    </div>

                    {/* Task Item 3 */}
                    <div className="p-2.5 rounded-lg border border-white/5 glass-panel bg-slate-900/60 flex items-center justify-between text-left">
                      <span className="text-[10px] font-semibold text-white truncate">Code Review</span>
                      <span className="text-[8px] font-bold text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/10">High</span>
                    </div>

                    {/* Task Item 4 */}
                    <div className="p-2.5 rounded-lg border border-white/5 glass-panel bg-slate-900/60 flex items-center justify-between text-left">
                      <span className="text-[10px] font-semibold text-white truncate">Documentation</span>
                      <span className="text-[8px] font-bold text-cyan-400 bg-cyan-500/10 px-1 py-0.5 rounded border border-cyan-500/10">Low</span>
                    </div>
                  </div>

                  {/* AI Engine Core Node (Center) */}
                  <div className="relative flex items-center justify-center w-14 h-14 z-20 select-none">
                    {/* Ring animations */}
                    <div className="absolute inset-0 rounded-2xl bg-brand-purple/20 blur-md animate-pulse-slow" />
                    <div className="absolute -inset-1 rounded-2xl border border-brand-purple/40 animate-ping opacity-25" />
                    
                    {/* Central Core Panel */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-blue border border-white/10 flex items-center justify-center shadow-lg shadow-brand-purple/30">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Optimized Schedule Panel (Right) */}
                  <div className="w-44 glass-panel border border-white/10 bg-slate-900/70 p-3.5 rounded-xl z-20 text-left">
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2.5">
                      <Clock className="w-3.5 h-3.5 text-brand-purple" />
                      <span className="text-[10px] font-bold text-white tracking-wide uppercase">Optimized Schedule</span>
                    </div>

                    {/* Schedule Rows */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-slate-400">9:00 AM</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="text-[9px] font-medium text-slate-200">UI/UX Design</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-slate-400">11:00 AM</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="text-[9px] font-medium text-slate-200">Team Meeting</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-slate-400">2:00 PM</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="text-[9px] font-medium text-slate-200">Code Review</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-slate-400">4:00 PM</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <span className="text-[9px] font-medium text-slate-200">Documentation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Optimization Info Panel */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel border border-brand-purple/20 px-3 py-1.5 rounded-full z-20 flex items-center gap-1.5 shadow-lg shadow-black/40">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple fill-brand-purple/15" />
                  <span className="text-[9px] font-semibold text-slate-200">AI optimized your schedule for maximum productivity</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
