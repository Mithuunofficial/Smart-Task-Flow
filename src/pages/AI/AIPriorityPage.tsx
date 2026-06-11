import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useStore } from '../../store/useStore';
import AIRecommendation from '../../components/ai/AIRecommendation';
import PriorityCard from '../../components/ai/PriorityCard';

export default function AIPriorityPage() {
  const { tasks } = useStore();
  const [optimizing, setOptimizing] = useState(false);
  const [completeMessage, setCompleteMessage] = useState(false);

  const activeTasks = tasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => b.aiScore - a.aiScore);

  const handleReoptimize = () => {
    setOptimizing(true);
    setCompleteMessage(false);
    
    setTimeout(() => {
      setOptimizing(false);
      setCompleteMessage(true);
      
      setTimeout(() => {
        setCompleteMessage(false);
      }, 3000);
    }, 1800);
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-brand-purple" />
          AI Task Prioritizer
        </h1>
        <p className="text-xs text-slate-400 mt-1">Our intelligence engine processes deadlines, task values, and dependency trees to suggest your next best focus action.</p>
      </div>

      {/* AI Recommendation Banner */}
      <AIRecommendation
        optimizing={optimizing}
        handleReoptimize={handleReoptimize}
      />

      <AnimatePresence>
        {completeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold"
          >
            ✓ Priorities optimized successfully! Your dashboard statistics have been recalculated.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sorted Task Index list */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-display">AI Priority Matrix ({activeTasks.length} Pending Tasks)</h3>
        
        <div className="glass-panel border border-white/5 rounded-2xl bg-slate-950/15 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:grid">
            <div className="col-span-1 text-center">Score</div>
            <div className="col-span-4 text-left">Task</div>
            <div className="col-span-2 text-center">Urgency</div>
            <div className="col-span-3 text-left">Analysis</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/5">
            {activeTasks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xs text-slate-500">No active tasks to prioritize. Go to the Task Board to add a task.</p>
              </div>
            ) : (
              activeTasks.map((task) => (
                <PriorityCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
