import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import AnalyticsCards from '../../components/analytics/AnalyticsCards';
import BarChart from '../../components/analytics/BarChart';
import LineChart from '../../components/analytics/LineChart';
import PieChart from '../../components/analytics/PieChart';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-purple" />
            Performance Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review efficiency statistics, task category allocation ratios, and monthly output metrics.</p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1.5 p-1 glass-panel border border-white/5 rounded-xl bg-slate-950/20 self-start sm:self-auto">
          {(['weekly', 'monthly', 'yearly'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-brand-purple/20 text-white border border-brand-purple/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics top stats cards */}
      <AnalyticsCards />

      {/* Detailed charts container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <BarChart />
        <PieChart />
      </div>

      {/* Weekly Efficiency line graph */}
      <LineChart />
    </div>
  );
}
