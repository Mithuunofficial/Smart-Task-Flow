import { Sparkles, Info, RefreshCw } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AIRecommendationProps {
  optimizing: boolean;
  handleReoptimize: () => void;
}

export default function AIRecommendation({
  optimizing,
  handleReoptimize
}: AIRecommendationProps) {
  const { tasks } = useStore();

  const activeTasks = tasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => b.aiScore - a.aiScore);

  const highestPriorityTask = activeTasks[0];

  return (
    <div className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-brand-purple via-brand-cyan to-brand-blue animated-glow-border shadow-2xl">
      <div className="rounded-2xl p-6 md:p-8 bg-slate-950/95 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-4 max-w-xl relative z-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-[10px] font-bold text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
            <span>AI Recommendation Engine</span>
          </div>
          
          {highestPriorityTask ? (
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
                Execute <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">"{highestPriorityTask.title}"</span> next.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculated priority score <span className="text-brand-purple font-semibold">{highestPriorityTask.aiScore}/100</span>. {highestPriorityTask.deadlineAnalysis}
              </p>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-slate-400 leading-normal flex items-start gap-2">
                <Info className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Suggested Action</span>
                  {highestPriorityTask.suggestedAction}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">All priority tasks cleared!</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                There are no active tasks left in your workspace. Start by planning new goals or focus on your habits.
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 z-10">
          <button
            onClick={handleReoptimize}
            disabled={optimizing}
            className="px-5 py-3 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            {optimizing ? 'Calculating indexes...' : 'Re-optimize Priorities'}
          </button>
        </div>
      </div>
    </div>
  );
}
