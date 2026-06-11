import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../store/useStore';
import SmartScheduler from '../../components/ai/SmartScheduler';

interface ScheduledBlock {
  time: string;
  taskTitle: string;
  category: Task['category'];
  priority: Task['priority'];
  id: string;
}

export default function SchedulerPage() {
  const { tasks } = useStore();
  const [selectedDay, setSelectedDay] = useState(3);
  const [isAutoScheduled, setIsAutoScheduled] = useState(false);
  const [schedulingLoader, setSchedulingLoader] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);

  const [timeBlocks, setTimeBlocks] = useState<ScheduledBlock[]>([
    { id: 'sb-1', time: '09:00 AM', taskTitle: 'Daily Sync & Backlog Review', category: 'Admin', priority: 'Medium' },
    { id: 'sb-2', time: '10:00 AM', taskTitle: 'Research AI Priority Optimization', category: 'Development', priority: 'High' },
    { id: 'sb-3', time: '01:00 PM', taskTitle: 'Review dashboard styling revisions', category: 'Design', priority: 'Medium' },
    { id: 'sb-4', time: '03:00 PM', taskTitle: 'Draft TechCrunch announcement pitch', category: 'Marketing', priority: 'Low' }
  ]);

  const daysOfWeek = [
    { name: 'Mon', date: '08' },
    { name: 'Tue', date: '09' },
    { name: 'Wed', date: '10' },
    { name: 'Thu', date: '11' },
    { name: 'Fri', date: '12' },
    { name: 'Sat', date: '13' },
    { name: 'Sun', date: '14' }
  ];

  const pendingTasks = tasks.filter(t => t.status !== 'Completed');

  const handleAutoSchedule = () => {
    setSchedulingLoader(true);
    setSuccessBanner(false);
    
    setTimeout(() => {
      setSchedulingLoader(false);
      setIsAutoScheduled(true);
      setSuccessBanner(true);
      
      const highPriorityTasks = pendingTasks.filter(t => t.priority === 'High');
      
      const newScheduledBlocks: ScheduledBlock[] = [
        { id: 'sb-1', time: '09:00 AM', taskTitle: 'Daily Sync & Backlog Review', category: 'Admin', priority: 'Medium' },
        { id: 'sb-2', time: '10:00 AM', taskTitle: highPriorityTasks[0]?.title || 'Design Dashboard Mockups', category: highPriorityTasks[0]?.category || 'Design', priority: 'High' },
        { id: 'sb-3', time: '11:00 AM', taskTitle: highPriorityTasks[1]?.title || 'Security Vulnerability Audit', category: highPriorityTasks[1]?.category || 'Admin', priority: 'High' },
        { id: 'sb-4', time: '01:00 PM', taskTitle: 'Review dashboard styling revisions', category: 'Design', priority: 'Medium' },
        { id: 'sb-5', time: '02:00 PM', taskTitle: 'Refactor Analytics Visualizations', category: 'Development', priority: 'Medium' }
      ];
      
      setTimeBlocks(newScheduledBlocks);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Smart Scheduler</h1>
          <p className="text-xs text-slate-400 mt-1">Plan your day, configure deep-focus intervals, and let AI resolve scheduling conflicts.</p>
        </div>
        <button
          onClick={handleAutoSchedule}
          disabled={schedulingLoader}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-white" />
          {schedulingLoader ? 'Resolving conflicts...' : 'Auto-Schedule Day'}
        </button>
      </div>

      {/* Week Calendar Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/15">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold text-slate-200">June 2026</span>
          </div>
          <div className="flex gap-1.5">
            <button className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, idx) => {
            const isSelected = selectedDay === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-brand-purple/20 border-brand-purple/40 text-white shadow-lg shadow-brand-purple/5'
                    : 'bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider">{day.name}</span>
                <span className="text-sm font-extrabold">{day.date}</span>
                {idx === 2 && (
                  <span className="w-1 h-1 rounded-full bg-brand-purple mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {successBanner && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
          <Check className="w-4 h-4" />
          Auto-schedule complete! High priority tasks have been allocated into optimal deep-work morning slots.
        </div>
      )}

      {/* Scheduler split view */}
      <SmartScheduler
        timeBlocks={timeBlocks}
        isAutoScheduled={isAutoScheduled}
        handleAutoSchedule={handleAutoSchedule}
      />
    </div>
  );
}
