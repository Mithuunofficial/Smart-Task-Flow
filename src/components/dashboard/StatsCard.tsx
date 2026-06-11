import { TrendingUp, Sparkles, Flame } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../common/Card';

export default function StatsCard() {
  const { user, tasks, pomodoroMinutesToday } = useStore();

  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const totalTasksCount = tasks.length;
  const completionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  const pendingTasksToday = tasks.filter(t => t.status !== 'Completed');
  const focusHours = (pomodoroMinutesToday / 60).toFixed(1);

  const sparklines = {
    tasks: "M 0 25 Q 15 5, 30 18 T 60 8 T 90 22 T 120 12",
    completed: "M 0 30 Q 15 25, 30 15 T 60 5 T 90 12 T 120 2",
    score: "M 0 20 Q 15 12, 30 22 T 60 8 T 90 18 T 120 5",
    focus: "M 0 15 Q 15 5, 30 25 T 60 15 T 90 20 T 120 8"
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1 */}
      <GlassCard glowColor="purple" className="relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tasks Remaining</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-white">{pendingTasksToday.length}</span>
          <span className="text-[10px] text-violet-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +15%
          </span>
        </div>
        <p className="text-[9px] text-slate-500 mt-1">Active tasks in current cycle</p>
        <svg className="absolute bottom-2 right-4 w-18 h-8 text-brand-purple/20 overflow-visible group-hover:text-brand-purple/40 transition-colors" viewBox="0 0 120 30">
          <path d={sparklines.tasks} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </GlassCard>

      {/* Metric 2 */}
      <GlassCard glowColor="blue" className="relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completed Tasks</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-white">{completedTasksCount}</span>
          <span className="text-[10px] text-green-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +{completionPercentage}%
          </span>
        </div>
        <p className="text-[9px] text-slate-500 mt-1">Total finished tasks history</p>
        <svg className="absolute bottom-2 right-4 w-18 h-8 text-brand-blue/20 overflow-visible group-hover:text-brand-blue/40 transition-colors" viewBox="0 0 120 30">
          <path d={sparklines.completed} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </GlassCard>

      {/* Metric 3 */}
      <GlassCard glowColor="cyan" className="relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Productivity Score</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-white">{user.efficiencyIndex}%</span>
          <span className="text-[10px] text-cyan-400 flex items-center gap-0.5">
            <Sparkles className="w-3 h-3 text-brand-cyan" />
            Peak
          </span>
        </div>
        <p className="text-[9px] text-slate-500 mt-1">AI-calculated focus rating</p>
        <svg className="absolute bottom-2 right-4 w-18 h-8 text-brand-cyan/20 overflow-visible group-hover:text-brand-cyan/40 transition-colors" viewBox="0 0 120 30">
          <path d={sparklines.score} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </GlassCard>

      {/* Metric 4 */}
      <GlassCard glowColor="pink" className="relative overflow-hidden group">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Focus Time Today</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-white">{focusHours}h</span>
          <span className="text-[10px] text-pink-400 flex items-center gap-0.5">
            <Flame className="w-3 h-3" />
            Active
          </span>
        </div>
        <p className="text-[9px] text-slate-500 mt-1">Pomodoro session minutes logged</p>
        <svg className="absolute bottom-2 right-4 w-18 h-8 text-brand-pink/20 overflow-visible group-hover:text-brand-pink/40 transition-colors" viewBox="0 0 120 30">
          <path d={sparklines.focus} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </GlassCard>
    </div>
  );
}
