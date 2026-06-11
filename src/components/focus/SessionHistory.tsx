import { AlignLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function SessionHistory() {
  const { focusHistory } = useStore();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/15 space-y-4 text-left">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <AlignLeft className="w-4 h-4 text-brand-purple" />
          Completed Sessions
        </h4>
      </div>

      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
        {focusHistory.length === 0 ? (
          <p className="text-[10px] text-slate-500 py-6 text-center">No completed sessions logged today.</p>
        ) : (
          focusHistory.map((session) => (
            <div key={session.id} className="p-2.5 rounded-lg border border-white/5 bg-white/5 text-[10px] flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-200 block">⚡ Deep Work ({session.duration}m)</span>
                <span className="text-slate-500 mt-0.5 block">Category: {session.category}</span>
              </div>
              <span className="text-slate-400 font-medium">{session.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
