import { CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';

interface PriorityCardProps {
  task: Task;
}

export default function PriorityCard({ task }: PriorityCardProps) {
  const { updateTask } = useStore();
  const isImmediate = task.urgency === 'Immediate';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 p-4 items-center hover:bg-white/5 transition-colors">
      {/* Score column */}
      <div className="col-span-1 flex sm:justify-center items-center gap-2 sm:gap-0">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider sm:hidden">AI Score:</span>
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="22" cy="22" r="18" className="stroke-slate-800 fill-none" strokeWidth="2.5" />
            <circle 
              cx="22" 
              cy="22" 
              r="18" 
              className={`fill-none ${isImmediate ? 'stroke-rose-500' : 'stroke-brand-purple'}`} 
              strokeWidth="2.5" 
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 - (task.aiScore / 100) * (2 * Math.PI * 18)}
            />
          </svg>
          <span className="text-xs font-extrabold text-white">{task.aiScore}</span>
        </div>
      </div>

      {/* Task Title / Category column */}
      <div className="col-span-4 text-left">
        <p className="text-xs font-bold text-slate-200">{task.title}</p>
        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">
          {task.category}
        </span>
      </div>

      {/* Urgency Badge column */}
      <div className="col-span-2 sm:text-center text-left flex sm:justify-center items-center gap-2 sm:gap-0">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider sm:hidden">Urgency:</span>
        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
          isImmediate 
            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10 animate-pulse' 
            : task.urgency === 'Moderate'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
              : 'bg-slate-800 text-slate-400'
        }`}>
          {task.urgency}
        </span>
      </div>

      {/* Analysis column */}
      <div className="col-span-3 text-left">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider sm:hidden block mb-0.5">Analysis:</span>
        <p className="text-[10px] text-slate-400 leading-relaxed">{task.deadlineAnalysis}</p>
      </div>

      {/* Quick Shift Status Actions column */}
      <div className="col-span-2 flex justify-end gap-2 items-center">
        <button
          onClick={() => updateTask(task.id, { status: 'Completed' })}
          className="px-2.5 py-1.5 rounded-lg border border-white/5 text-[9px] font-bold bg-white/5 text-slate-300 hover:text-green-400 hover:border-green-500/20 hover:bg-green-500/5 transition-all flex items-center gap-1 cursor-pointer w-full sm:w-auto justify-center"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          Complete
        </button>
      </div>
    </div>
  );
}
