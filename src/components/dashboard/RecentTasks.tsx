import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Calendar, Bell, Check, ChevronRight, BrainCircuit, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function RecentTasks() {
  const { tasks, updateTask, notifications } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const pendingTasksToday = tasks.filter(t => t.status !== 'Completed');
  const upcomingDeadlines = tasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const displayTasks = tasks
    .filter((t) => {
      if (activeTab === 'pending') return t.status !== 'Completed';
      if (activeTab === 'completed') return t.status === 'Completed';
      return true;
    })
    .slice(0, 5);

  const toggleTaskStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    updateTask(id, { status: newStatus });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Widget 1: Interactive Checklist */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 flex flex-col h-96">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-brand-purple" />
            Recent Checklist
          </h4>
          
          <div className="flex items-center gap-1 text-[9px]">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded ${activeTab === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-2 py-0.5 rounded ${activeTab === 'pending' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {displayTasks.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center py-16">No checklist tasks found.</p>
          ) : (
            displayTasks.map(task => {
              const isCompleted = task.status === 'Completed';
              return (
                <div 
                  key={task.id}
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isCompleted 
                      ? 'bg-slate-900/30 border-white/5 opacity-60' 
                      : 'bg-white/5 border-white/5 hover:border-brand-purple/20'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-4.5 h-4.5 rounded-lg flex items-center justify-center border transition-all ${
                      isCompleted 
                        ? 'bg-brand-purple border-brand-purple text-white' 
                        : 'border-slate-500 bg-transparent'
                    }`}>
                      {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    
                    <div className="text-left overflow-hidden">
                      <p className={`text-xs font-semibold leading-tight truncate ${isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <span className="text-[9px] text-slate-500 block mt-0.5">@ {task.category}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    task.priority === 'High' 
                      ? 'bg-rose-500/10 text-rose-400' 
                      : task.priority === 'Medium' 
                        ? 'bg-amber-500/10 text-amber-400' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <Link 
          to="/tasks" 
          className="w-full text-center mt-3 pt-3 border-t border-white/5 text-[10px] font-semibold text-brand-purple hover:underline flex items-center justify-center gap-1"
        >
          Manage all tasks
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Widget 2: Upcoming Deadlines & AI Suggestions */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 flex flex-col h-96">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-purple" />
            Upcoming Deadlines
          </h4>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {upcomingDeadlines.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center py-16">All tasks completed! Excellent momentum.</p>
          ) : (
            upcomingDeadlines.map(task => (
              <div key={task.id} className="p-3 bg-white/5 border border-white/5 rounded-xl text-left space-y-2 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start gap-1">
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">{task.title}</span>
                  <span className="text-[8px] bg-white/5 border border-white/5 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                    {task.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    Due: {task.dueDate}
                  </span>
                  <span className="text-slate-400 font-medium">
                    Estimate: {task.timeEstimate || '2h'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Prompt Suggestion Card */}
        <div className="mt-4 p-3 bg-gradient-to-tr from-brand-purple/15 to-indigo-950/20 border border-brand-purple/20 rounded-xl text-left relative overflow-hidden">
          <div className="flex items-center gap-1 text-brand-purple mb-1 font-bold text-[10px]">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>SMART PRIORITY</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-tight">
            {pendingTasksToday.length > 0 
              ? `Ready to get started? We suggest prioritizing your Figma mockup design based on developer workflows today.` 
              : 'Excellent work! You have cleared all pending items. Spend time on your daily habits.'
            }
          </p>
          <Link 
            to="/ai-priority" 
            className="mt-2 text-[9px] font-bold text-violet-300 hover:text-white flex items-center gap-0.5 hover:underline"
          >
            Analyze with AI
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Widget 3: Live Feed & Notifications list */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 flex flex-col h-96">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-brand-purple" />
            Notifications & Alerts
          </h4>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.slice(0, 4).map(notif => (
            <div 
              key={notif.id}
              className={`p-3 bg-white/5 border border-white/5 rounded-xl text-left transition-all hover:border-white/10 ${
                notif.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{notif.title}</span>
                <span className="text-[8px] text-slate-500">{notif.time}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{notif.message}</p>
            </div>
          ))}
        </div>

        <Link 
          to="/notifications" 
          className="w-full text-center mt-3 pt-3 border-t border-white/5 text-[10px] font-semibold text-brand-purple hover:underline flex items-center justify-center gap-1"
        >
          Clear all notifications
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
