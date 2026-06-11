import { motion } from 'framer-motion';

export default function BarChart() {
  const monthlyCompletionData = [
    { month: 'Jan', count: 18, color: 'fill-indigo-500' },
    { month: 'Feb', count: 24, color: 'fill-blue-500' },
    { month: 'Mar', count: 15, color: 'fill-cyan-500' },
    { month: 'Apr', count: 32, color: 'fill-brand-purple' },
    { month: 'May', count: 28, color: 'fill-pink-500' },
    { month: 'Jun', count: 38, color: 'fill-violet-400' }
  ];

  return (
    <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-white font-display">Task Output Velocity</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Monthly completed tasks count over the last 6 months</p>
        </div>
      </div>

      <div className="relative w-full h-60">
        <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
          <line x1="50" y1="40" x2="650" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="90" x2="650" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="140" x2="650" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="190" x2="650" y2="190" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

          {monthlyCompletionData.map((d, idx) => {
            const barWidth = 45;
            const barSpacing = 100;
            const x = 50 + idx * barSpacing + (barSpacing - barWidth) / 2;
            const height = Math.max(5, d.count * 3.75);
            const y = 190 - height;
            
            return (
              <g key={d.month} className="group cursor-pointer">
                <motion.rect
                  initial={{ height: 0, y: 190 }}
                  animate={{ height, y }}
                  transition={{ duration: 1.2, delay: idx * 0.1, ease: 'easeOut' }}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  rx="4"
                  className={`${d.color} opacity-80 group-hover:opacity-100 transition-all`}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-[10px] font-extrabold fill-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {d.count} tasks
                </text>
              </g>
            );
          })}

          <text x="35" y="44" textAnchor="end" className="text-[9px] fill-slate-500">40</text>
          <text x="35" y="94" textAnchor="end" className="text-[9px] fill-slate-500">25</text>
          <text x="35" y="144" textAnchor="end" className="text-[9px] fill-slate-500">10</text>
          <text x="35" y="194" textAnchor="end" className="text-[9px] fill-slate-500">0</text>

          {monthlyCompletionData.map((d, idx) => (
            <text key={idx} x={50 + idx * 100 + 50} y="214" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
