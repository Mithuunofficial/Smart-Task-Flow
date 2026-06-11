import { Flame } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ActivityFeed() {
  const { tasks } = useStore();

  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
      {/* Gauge card */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col items-center justify-center text-center flex-1 min-h-[220px]">
        <h3 className="text-xs font-bold text-white font-display mb-4 self-start">Cycle Completion Rate</h3>
        
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="46" className="stroke-slate-800 fill-none" strokeWidth="6" />
            <circle 
              cx="56" 
              cy="56" 
              r="46" 
              className="stroke-brand-purple fill-none transition-all duration-500" 
              strokeWidth="6" 
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 - (completionPercentage / 100) * (2 * Math.PI * 46)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-white leading-none">{completionPercentage}%</span>
            <span className="text-[8px] text-slate-500 uppercase mt-1">Goal Status</span>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-4 leading-normal">
          {completionPercentage >= 75 
            ? 'Outstanding speed! You are on track to complete this cycle ahead of schedule.' 
            : 'Steady progress. Dedicate your next work block to the pending high-priority items.'
          }
        </p>
      </div>

      {/* Daily Streak widget */}
      <div className="glass-panel rounded-2xl p-4 border border-white/5 bg-slate-950/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
            <Flame className="w-5.5 h-5.5 fill-amber-500/20 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white font-display">Daily Streak</h4>
            <p className="text-[9px] text-slate-400 mt-0.5">Consecutive focus goals hit</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold text-amber-500">12 Days</span>
        </div>
      </div>
    </div>
  );
}
