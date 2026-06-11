import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';
import { GlassCard } from '../common/Card';

interface ScheduledBlock {
  time: string;
  taskTitle: string;
  category: Task['category'];
  priority: Task['priority'];
  id: string;
}

interface SmartSchedulerProps {
  timeBlocks: ScheduledBlock[];
  isAutoScheduled: boolean;
  handleAutoSchedule: () => void;
}

export default function SmartScheduler({
  timeBlocks,
  isAutoScheduled,
  handleAutoSchedule
}: SmartSchedulerProps) {
  const { tasks } = useStore();
  const pendingTasks = tasks.filter(t => t.status !== 'Completed');

  const hours = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Timeline scheduler view */}
      <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 space-y-6">
        <h3 className="text-sm font-bold text-white font-display text-left">Timeline Visualization - Daily Planner</h3>
        
        <div className="space-y-4">
          {hours.map((hour) => {
            const matchedBlock = timeBlocks.find(b => b.time === hour);
            return (
              <div key={hour} className="flex items-start gap-4">
                <span className="text-[10px] text-slate-500 font-bold w-16 text-right pt-2.5">{hour}</span>
                
                <div className="flex-1 min-h-[50px] border-t border-white/5 relative flex items-center">
                  {matchedBlock ? (
                    <motion.div
                      initial={isAutoScheduled ? { scale: 0.95, opacity: 0 } : false}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-left ${
                        matchedBlock.priority === 'High'
                          ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                          : matchedBlock.priority === 'Medium'
                            ? 'bg-brand-purple/15 border-brand-purple/20 text-violet-300'
                            : 'bg-white/5 border-white/5 text-slate-300'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold">{matchedBlock.taskTitle}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[8px] bg-black/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider text-slate-400">
                            {matchedBlock.category}
                          </span>
                          <span className="text-[8px] text-slate-500 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            50m block
                          </span>
                        </div>
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                        matchedBlock.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {matchedBlock.priority}
                      </span>
                    </motion.div>
                  ) : (
                    <div className="w-full h-10 border border-dashed border-white/5 rounded-xl hover:bg-white/5 hover:border-brand-purple/10 cursor-pointer transition-all flex items-center justify-center">
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">+ Free Time Block</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: AI Auto scheduling suggestions details */}
      <div className="lg:col-span-4 space-y-6">
        
        <GlassCard glowColor="purple" className="space-y-4">
          <div className="flex items-center gap-2 text-brand-purple">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider text-left">AI Scheduler Suggestions</h4>
          </div>
          
          <p className="text-[10px] text-slate-300 leading-normal text-left">
            Based on historical focus data, your cognitive energy peaks between <b>9:00 AM</b> and <b>11:30 AM</b>. We recommend dedicating these morning hours to High Priority tasks.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-violet-600/10 border border-violet-500/15 rounded-xl text-[10px] text-left">
              <span className="font-bold text-violet-300 block mb-0.5">🗓️ Optimize Design Sprint</span>
              Schedule "Design Dashboard Mockups" before noon. High cognitive load requires morning execution.
            </div>
            
            <div className="p-3 bg-indigo-600/10 border border-indigo-500/15 rounded-xl text-[10px] text-left">
              <span className="font-bold text-indigo-300 block mb-0.5">🔋 Admin Compression</span>
              Review backlog and meetings together during the 1:00 PM slot to prevent context-switching delays.
            </div>
          </div>
        </GlassCard>

        {/* Unscheduled Tasks widget */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/15 space-y-4 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Unscheduled Tasks</h4>
            <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded font-bold">{pendingTasks.length}</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {pendingTasks.map((t) => (
              <div key={t.id} className="p-2.5 rounded-lg border border-white/5 bg-white/5 text-[10px] flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-200 block truncate max-w-[150px]">{t.title}</span>
                  <span className="text-rose-400 mt-0.5 block">Due: {t.dueDate}</span>
                </div>
                <button 
                  onClick={handleAutoSchedule}
                  className="px-2 py-1 bg-brand-purple/20 text-brand-purple border border-brand-purple/30 text-[8px] font-bold rounded-lg hover:bg-brand-purple hover:text-white transition-all"
                >
                  Schedule
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
