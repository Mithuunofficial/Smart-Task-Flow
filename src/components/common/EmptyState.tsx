import React from 'react';
import { Layers, Users, Bell, Calendar } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyTasks: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-white/5 bg-slate-950/20">
    <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4 border border-brand-purple/20 animate-pulse">
      <Layers className="w-8 h-8" />
    </div>
    <h3 className="text-base font-bold text-white font-display mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">{description}</p>
    {actionLabel && onAction && (
      <button 
        onClick={onAction}
        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export const EmptyNotifications: React.FC<Omit<EmptyStateProps, 'onAction' | 'actionLabel'>> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center py-12">
    <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-400 mb-4 border border-white/5">
      <Bell className="w-6 h-6" />
    </div>
    <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-xs">{description}</p>
  </div>
);

export const EmptyTeam: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-white/5 bg-slate-950/20">
    <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4 border border-brand-blue/20">
      <Users className="w-8 h-8" />
    </div>
    <h3 className="text-base font-bold text-white font-display mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">{description}</p>
    {actionLabel && onAction && (
      <button 
        onClick={onAction}
        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export const EmptyAnalytics: React.FC<Omit<EmptyStateProps, 'onAction' | 'actionLabel'>> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-2xl border border-white/5 bg-slate-950/20">
    <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-4 border border-brand-cyan/20">
      <Calendar className="w-8 h-8" />
    </div>
    <h3 className="text-base font-bold text-white font-display mb-1">{title}</h3>
    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{description}</p>
  </div>
);
export default EmptyTasks;
