import { Link } from 'react-router-dom';
import { Plus, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import StatsCard from '../../components/dashboard/StatsCard';
import ProductivityChart from '../../components/dashboard/ProductivityChart';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import RecentTasks from '../../components/dashboard/RecentTasks';

export default function Dashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            Welcome back, {user.name}! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Here is a summary of your smart workspace and habits today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/tasks"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </Link>
          <Link 
            to="/focus"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 rounded-xl glass-panel hover:bg-white/5 border border-white/5 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Clock className="w-4 h-4 text-brand-purple" />
            Focus Session
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <StatsCard />

      {/* Main Charts & Overview columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ProductivityChart />
        <ActivityFeed />
      </div>

      {/* Checklist, deadlines, notifications */}
      <RecentTasks />
    </div>
  );
}
