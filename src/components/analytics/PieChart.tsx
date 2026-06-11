import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function PieChart() {
  const { tasks } = useStore();

  const categoryStats = {
    Design: tasks.filter(t => t.category === 'Design').length,
    Development: tasks.filter(t => t.category === 'Development').length,
    Product: tasks.filter(t => t.category === 'Product').length,
    Marketing: tasks.filter(t => t.category === 'Marketing').length,
    Admin: tasks.filter(t => t.category === 'Admin').length
  };

  const totalCategoryCount = Object.values(categoryStats).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col justify-between">
      <div className="border-b border-white/5 pb-3 mb-4 text-left">
        <h3 className="text-sm font-bold text-white font-display">Category Distribution</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Allocation share across current tasks</p>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {Object.entries(categoryStats).map(([cat, count]) => {
          const percentage = Math.round((count / totalCategoryCount) * 100);
          
          const barColorsMap: Record<string, string> = {
            Design: 'bg-brand-purple',
            Development: 'bg-brand-blue',
            Product: 'bg-brand-cyan',
            Marketing: 'bg-brand-pink',
            Admin: 'bg-slate-500'
          };
          const barColors = barColorsMap[cat] || 'bg-slate-500';

          return (
            <div key={cat} className="space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">{cat}</span>
                <span className="font-bold text-white">{count} ({percentage}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${barColors}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
