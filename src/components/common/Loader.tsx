import React from 'react';
import { Sparkles } from 'lucide-react';

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 rounded-full border-2 border-brand-purple/20 border-t-brand-purple animate-spin" />
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-white/10 rounded w-1/3" />
      <div className="h-6 bg-white/10 rounded-full w-12" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
    </div>
    <div className="flex items-center gap-2 pt-2">
      <div className="w-6 h-6 rounded-full bg-white/10" />
      <div className="h-3 bg-white/10 rounded w-16" />
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 space-y-2 animate-pulse">
          <div className="h-3 bg-white/10 rounded w-1/2" />
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-3 bg-white/10 rounded w-1/4" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 h-64 animate-pulse" />
      <div className="glass-panel p-6 rounded-2xl border border-white/5 h-64 animate-pulse" />
    </div>
  </div>
);

export const TasksSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 space-y-4 h-[500px]">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-5 bg-white/10 rounded-full w-8" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-2">
              <div className="h-3.5 bg-white/10 rounded w-3/4" />
              <div className="h-2.5 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const AnalyticsSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 h-20 animate-pulse" />
      ))}
    </div>
    <div className="glass-panel p-6 rounded-2xl border border-white/5 h-[350px] animate-pulse" />
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
    <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center space-y-4">
      <div className="w-24 h-24 rounded-full bg-white/10" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
    </div>
    <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
      <div className="h-5 bg-white/10 rounded w-1/4" />
      <div className="space-y-3">
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
      </div>
    </div>
  </div>
);

export const ThemeToggle: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-white/5 text-xs text-slate-400">
      <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
      <span>Futuristic Dark theme locked</span>
    </div>
  );
};

export default Loader;
