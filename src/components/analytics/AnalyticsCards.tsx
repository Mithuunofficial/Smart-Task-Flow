import { Clock, CheckSquare, Award, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { GlassCard } from '../common/Card';

export default function AnalyticsCards() {
  const { user, tasks } = useStore();

  const totalCompleted = tasks.filter(t => t.status === 'Completed').length;
  const totalPending = tasks.filter(t => t.status !== 'Completed').length;
  const completionRate = Math.round((totalCompleted / (totalCompleted + totalPending || 1)) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Focus Score */}
      <GlassCard glowColor="purple" className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 text-brand-purple">
          <Clock className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Focus Score</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-extrabold text-white">{user.focusScore}/100</span>
            <span className="text-[9px] text-green-400 font-semibold">+4.2%</span>
          </div>
          <p className="text-[9px] text-slate-500 mt-0.5">Aggregated cognitive load stability</p>
        </div>
      </GlassCard>

      {/* Card 2: Completion Rate */}
      <GlassCard glowColor="blue" className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 text-brand-blue">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Completion Rate</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-extrabold text-white">{completionRate}%</span>
            <span className="text-[9px] text-green-400 font-semibold">+8.5%</span>
          </div>
          <p className="text-[9px] text-slate-500 mt-0.5">Ratio of completed vs created tasks</p>
        </div>
      </GlassCard>

      {/* Card 3: Efficiency Index */}
      <GlassCard glowColor="cyan" className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan">
          <Award className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Efficiency Index</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-extrabold text-white">{user.efficiencyIndex}/100</span>
            <span className="text-[9px] text-cyan-400 flex items-center gap-0.5">
              <Sparkles className="w-3.5 h-3.5" /> High
            </span>
          </div>
          <p className="text-[9px] text-slate-500 mt-0.5">Velocity and schedule adherence rating</p>
        </div>
      </GlassCard>
    </div>
  );
}
