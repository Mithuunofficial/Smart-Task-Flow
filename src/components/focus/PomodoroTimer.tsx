import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function PomodoroTimer() {
  const { addFocusSession } = useStore();
  const [active, setActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionLength, setSessionLength] = useState(25);
  const [category, setCategory] = useState<'Development' | 'Design' | 'Product' | 'Admin'>('Development');

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            addFocusSession(sessionLength, category);
            alert(`Focus Session Completed! Take a 5-minute break.`);
            return sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, sessionLength, category, addFocusSession]);

  const toggleTimer = () => setActive(!active);
  const resetTimer = () => {
    setActive(false);
    setTimeLeft(sessionLength * 60);
  };

  const adjustSessionLength = (mins: number) => {
    if (active) return;
    const nextVal = Math.max(5, Math.min(60, mins));
    setSessionLength(nextVal);
    setTimeLeft(nextVal * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = (sessionLength * 60 - timeLeft) / (sessionLength * 60);
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col items-center justify-center min-h-[450px]">
      
      {/* Category selectors */}
      <div className="flex items-center gap-2 mb-8 bg-slate-950/40 p-1 border border-white/5 rounded-xl">
        {(['Development', 'Design', 'Product', 'Admin'] as const).map((cat) => (
          <button
            key={cat}
            disabled={active}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              category === cat
                ? 'bg-brand-purple/20 text-white border border-brand-purple/10'
                : 'text-slate-400 hover:text-white disabled:opacity-30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SVG Ticking Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0.2 }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-60 h-60 rounded-full bg-brand-purple/5 border border-brand-purple/15 blur-md"
            />
          )}
        </AnimatePresence>

        <svg className="w-full h-full transform -rotate-90">
          <circle cx="128" cy="128" r={radius} className="stroke-slate-900 fill-none" strokeWidth="6" />
          <circle 
            cx="128" 
            cy="128" 
            r={radius} 
            className="stroke-brand-purple fill-none transition-all duration-300" 
            strokeWidth="6" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">{formatTime(timeLeft)}</span>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1.5">
            {active ? 'Deep work ticking' : 'Ready to Focus'}
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => adjustSessionLength(sessionLength - 5)}
          disabled={active}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-slate-400 disabled:opacity-35"
        >
          -5
        </button>

        <button
          onClick={toggleTimer}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer shadow-lg shadow-brand-purple/20"
        >
          {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          {active ? 'Pause Focus' : 'Start Session'}
        </button>

        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-slate-400"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => adjustSessionLength(sessionLength + 5)}
          disabled={active}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-slate-400 disabled:opacity-35"
        >
          +5
        </button>
      </div>

    </div>
  );
}
