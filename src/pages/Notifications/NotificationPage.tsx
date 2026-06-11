import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, ShieldAlert } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { EmptyNotifications } from '../../components/common/EmptyState';

export default function NotificationPage() {
  const { notifications, markNotificationAsRead, clearNotifications } = useStore();
  const [filter, setFilter] = useState<'All' | 'ai' | 'deadline' | 'reminder'>('All');

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      clearNotifications();
    }
  };

  const filteredNotifs = notifications.filter((notif) => {
    if (filter === 'All') return true;
    return notif.type === filter;
  });

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-purple" />
            Notification Inbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review alerts, warnings, team logs, and AI priority suggestions.</p>
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/10 rounded-xl border border-rose-500/10 cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories filters */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 glass-panel border border-white/5 rounded-xl bg-slate-950/20 max-w-max">
        {(['All', 'ai', 'deadline', 'reminder'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === t
                ? 'bg-brand-purple/20 text-white border border-brand-purple/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t === 'ai' ? 'AI SUGGESTIONS' : t === 'deadline' ? 'DEADLINES' : t === 'reminder' ? 'REMINDERS' : 'ALL ALERTS'}
          </button>
        ))}
      </div>

      {/* Main notifications list */}
      <div className="glass-panel border border-white/5 rounded-2xl bg-slate-950/15 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filteredNotifs.length === 0 ? (
            <EmptyNotifications 
              title="No Notifications Found"
              description="You are all caught up! No recent alerts or suggestions pending."
            />
          ) : (
            <AnimatePresence initial={false}>
              {filteredNotifs.map((notif) => {
                const isAi = notif.type === 'ai';
                const isDeadline = notif.type === 'deadline';

                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className={`p-4 flex gap-4 items-start cursor-pointer hover:bg-white/5 transition-all text-left ${
                      notif.read ? 'opacity-60 bg-transparent' : 'bg-brand-purple/5'
                    }`}
                  >
                    {/* Icon container based on alert category */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${
                      isAi 
                        ? 'bg-brand-purple/15 text-brand-purple border-brand-purple/20' 
                        : isDeadline
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                          : 'bg-white/5 text-slate-400 border-white/5'
                    }`}>
                      {isAi ? <Sparkles className="w-4 h-4" /> : isDeadline ? <ShieldAlert className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </div>

                    <div className="flex-grow space-y-1 overflow-hidden">
                      <div className="flex justify-between items-center gap-2">
                        <span className={`text-xs font-bold text-white ${notif.read ? 'font-normal text-slate-300' : ''}`}>
                          {notif.title}
                        </span>
                        <span className="text-[9px] text-slate-500 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{notif.message}</p>
                    </div>

                    {!notif.read && (
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-purple self-center shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
