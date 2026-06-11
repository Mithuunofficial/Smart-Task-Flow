import { Search, Filter } from 'lucide-react';

interface TaskFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priorityFilter: 'All' | 'High' | 'Medium' | 'Low';
  setPriorityFilter: (filter: 'All' | 'High' | 'Medium' | 'Low') => void;
}

export default function TaskFilter({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter
}: TaskFilterProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 glass-panel rounded-2xl border border-white/5 bg-slate-950/15">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Priority:</span>
        </div>
        <div className="flex items-center gap-1">
          {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 text-[10px] font-semibold rounded-lg border transition-all ${
                priorityFilter === p
                  ? 'bg-brand-purple/20 text-white border-brand-purple/30'
                  : 'bg-transparent text-slate-400 border-white/5 hover:text-white hover:bg-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
