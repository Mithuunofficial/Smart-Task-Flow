import { useState } from 'react';
import { Activity, Flame, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Modal } from '../../components/common/Modal';
import { GlassCard } from '../../components/common/Card';

export default function HabitTrackerPage() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    addHabit(name, frequency);
    setIsModalOpen(false);
    setName('');
  };

  const getWeekDays = () => {
    return [
      { name: 'Mon', date: '2026-06-08' },
      { name: 'Tue', date: '2026-06-09' },
      { name: 'Wed', date: '2026-06-10' },
      { name: 'Thu', date: '2026-06-11' },
      { name: 'Fri', date: '2026-06-12' },
      { name: 'Sat', date: '2026-06-13' },
      { name: 'Sun', date: '2026-06-14' }
    ];
  };

  const weekdays = getWeekDays();
  const todayDate = '2026-06-10';

  const completedTodayCount = habits.filter(h => h.history[todayDate] === true).length;
  const totalHabitsCount = habits.length;
  const todayCompletionPercentage = totalHabitsCount > 0 ? Math.round((completedTodayCount / totalHabitsCount) * 100) : 0;

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-purple" />
            Habit Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure recurring daily goals, track weekly check-in streaks, and build momentum.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Habit
        </button>
      </div>

      {/* Habit Overview & Progress Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Habits checklist grid */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-white font-display">Weekly Habit Grid</h3>
            <span className="text-[10px] text-slate-400">Click day buttons to toggle check-in status</span>
          </div>

          <div className="space-y-4">
            {habits.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xs text-slate-500">No habits tracked yet. Create one to begin!</p>
              </div>
            ) : (
              habits.map((habit) => (
                <div key={habit.id} className="p-4 bg-brand-card border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Title & Streak info */}
                  <div className="flex items-center justify-between md:justify-start gap-4">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white">{habit.name}</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Frequency: {habit.frequency}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                      <Flame className="w-4 h-4 fill-amber-500/10 animate-pulse" />
                      <span className="text-xs font-extrabold">{habit.streak}d</span>
                    </div>
                  </div>

                  {/* Mon-Sun check-in days */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {weekdays.map((day) => {
                      const isDone = habit.history[day.date] || false;
                      const isToday = day.date === todayDate;
                      return (
                        <button
                          key={day.date}
                          onClick={() => toggleHabit(habit.id, day.date)}
                          className={`w-9 h-11 rounded-lg border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                            isDone
                              ? 'bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/20'
                              : isToday
                                ? 'bg-slate-900 border-brand-purple/40 text-brand-purple hover:bg-slate-800'
                                : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-[8px] font-bold uppercase">{day.name}</span>
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                            isDone ? 'bg-white text-brand-purple border-white' : 'border-slate-500 bg-transparent'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        if (confirm('Delete this habit?')) deleteHabit(habit.id);
                      }}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors ml-2"
                      title="Delete Habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Habit Streaks statistics & Progress ring */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col items-center text-center">
            <h3 className="text-xs font-bold text-white font-display mb-4 self-start">Today's Check-In Status</h3>
            
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
                  strokeDashoffset={2 * Math.PI * 46 - (todayCompletionPercentage / 100) * (2 * Math.PI * 46)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-white leading-none">{todayCompletionPercentage}%</span>
                <span className="text-[8px] text-slate-500 uppercase mt-1">Done Today</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-4 leading-normal">
              {todayCompletionPercentage === 100 
                ? 'Fantastic! You hit all tracked habits today. Lock in this streak!' 
                : 'Complete remaining habits today to keep your streak going!'
              }
            </p>
          </div>

          <GlassCard glowColor="purple" className="space-y-4">
            <div className="flex items-center gap-1.5 text-brand-purple">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider text-left">Habit Coach AI</h4>
            </div>
            <p className="text-[10px] text-slate-300 leading-normal text-left">
              Completing habits like <b>"Deep Work Focus"</b> in the morning triggers a positive momentum cascade, boosting your downstream task execution speed by <b>22%</b>.
            </p>
          </GlassCard>
        </div>

      </div>

      {/* ADD HABIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Habit">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Habit Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Meditate for 15 minutes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 text-white cursor-pointer"
            >
              Create Habit
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
