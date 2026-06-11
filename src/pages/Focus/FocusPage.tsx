import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Volume2 } from 'lucide-react';
import PomodoroTimer from '../../components/focus/PomodoroTimer';
import FocusStats from '../../components/focus/FocusStats';
import SessionHistory from '../../components/focus/SessionHistory';

export default function FocusPage() {
  const [ambientSound, setAmbientSound] = useState<'None' | 'Rain' | 'White Noise' | 'Lofi' | 'Synthwave'>('None');
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="space-y-6 text-left pb-12 relative">
      
      {/* Ticking Particle Animations simulation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 300, scale: 0.6 }}
            animate={{ 
              opacity: [0.1, 0.4, 0], 
              y: [300, 50, 0],
              x: [Math.random() * 200, Math.random() * 600, Math.random() * 800],
              scale: [0.6, 1.2, 0.8]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full bg-brand-purple/20 blur-[1px]"
          />
        ))}
      </div>

      {/* Header title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2 relative z-10">
          <Clock className="w-6 h-6 text-brand-purple" />
          Pomodoro Focus
        </h1>
        <p className="text-xs text-slate-400 mt-1 relative z-10">Lock in your attention, block background distractions, and track your daily focus duration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left column: Circular timer controller */}
        <PomodoroTimer />

        {/* Right column: Sound panel and history logs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Ambient Sounds selection card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/15 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-brand-purple" />
                Ambient Soundscape
              </h4>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`text-[9px] font-bold px-2 py-0.5 rounded ${soundEnabled ? 'bg-brand-purple/20 text-brand-purple' : 'bg-slate-800 text-slate-500'}`}
              >
                {soundEnabled ? 'MUTED' : 'ACTIVE'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-left">
              {(['None', 'Rain', 'White Noise', 'Lofi', 'Synthwave'] as const).map((sound) => (
                <button
                  key={sound}
                  onClick={() => setAmbientSound(sound)}
                  className={`p-2 rounded-lg border text-[10px] font-bold text-left cursor-pointer transition-all ${
                    ambientSound === sound
                      ? 'bg-brand-purple/20 border-brand-purple/30 text-white'
                      : 'bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {sound}
                </button>
              ))}
            </div>
          </div>

          {/* Daily metrics log */}
          <FocusStats />

          {/* Focus session history list */}
          <SessionHistory />

        </div>

      </div>
    </div>
  );
}
