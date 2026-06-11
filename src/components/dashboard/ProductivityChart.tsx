import { motion } from 'framer-motion';

export default function ProductivityChart() {
  const chartPoints = "50 140, 150 100, 250 160, 350 40, 450 110, 550 180, 650 70";

  return (
    <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-white font-display">Productivity Trends</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Tasks completed daily throughout the current week</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-brand-purple" />
          <span>Current Cycle</span>
        </div>
      </div>

      <div className="relative w-full h-52 flex-1">
        <svg className="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
          <line x1="50" y1="40" x2="650" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="90" x2="650" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="140" x2="650" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="190" x2="650" y2="190" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            d={`M ${chartPoints}`}
            fill="none"
            stroke="url(#gradient-purple-blue)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {chartPoints.split(', ').map((pt, idx) => {
            const [cx, cy] = pt.split(' ');
            const values = [4, 6, 3, 8, 5, 2, 7];
            return (
              <g key={idx} className="cursor-pointer group">
                <circle cx={cx} cy={cy} r="6" className="fill-brand-purple stroke-brand-bg stroke-2" />
                <circle cx={cx} cy={cy} r="12" className="fill-brand-purple/20 stroke-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <text x={cx} y={parseInt(cy) - 14} textAnchor="middle" className="text-[10px] font-bold fill-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900">
                  {values[idx]} tasks
                </text>
              </g>
            );
          })}

          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <text key={idx} x={50 + idx * 100} y="212" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">
              {day}
            </text>
          ))}

          <defs>
            <linearGradient id="gradient-purple-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
