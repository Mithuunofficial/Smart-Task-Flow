import { Award } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function FocusStats() {
  const { pomodoroMinutesToday, focusHistory } = useStore();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/15 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-brand-purple" />
          Today's Stats
        </h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-3 bg-white/5 rounded-xl">
          <span className="text-[9px] text-slate-500 font-bold uppercase block">Focus Logged</span>
          <span className="text-base font-extrabold text-white mt-1 block">{pomodoroMinutesToday} mins</span>
        </div>
        <div className="p-3 bg-white/5 rounded-xl">
          <span className="text-[9px] text-slate-500 font-bold uppercase block">Sessions Hit</span>
          <span className="text-base font-extrabold text-white mt-1 block">{focusHistory.length} Done</span>
        </div>
      </div>
    </div>
  );
}
