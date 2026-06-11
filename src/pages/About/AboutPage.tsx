import { Info, Sparkles, Code2, Layers, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6 text-left pb-12 max-w-4xl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <Info className="w-6 h-6 text-brand-purple" />
          About Smart Task Flow
        </h1>
        <p className="text-xs text-slate-400 mt-1">Discover the architectural layout, core values, and AI engine driving this productivity portal.</p>
      </div>

      {/* Main glass card mission statement */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-slate-950/15 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-base font-bold text-white flex items-center gap-1.5 font-display">
          <Sparkles className="w-4 h-4 text-brand-purple" />
          Our Mission
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          Smart Task Flow is engineered to streamline personal goals, team tasks, and cognitive tracking under a single, unified, futuristic dark-theme interface. We leverage micro-heuristic priority algorithms to prioritize tasks dynamically, resolving calendar blockages and eliminating decision fatigue.
        </p>
      </div>

      {/* Feature cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {[
          { icon: Cpu, title: 'AI Priority Indexing', desc: 'Computes numerical scores (0-99) for tasks dynamically according to user priority tags and proximity to deadlines, generating immediate suggested actions.' },
          { icon: Layers, title: 'Visual Kanban Workspaces', desc: 'Allows dragging and dropping cards between To Do, In Progress, and Completed states. Syncs status transitions with analytics decks instantly.' },
          { icon: Code2, title: 'Time-Blocked Calendars', desc: 'Smart Scheduler arranges focus hours in cognitive energy sweetspots, reserving mornings for core items and compression periods for meetings.' }
        ].map((feat, idx) => (
          <div key={idx} className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-3">
            <feat.icon className="w-5 h-5 text-brand-purple" />
            <h4 className="text-xs font-bold text-white">{feat.title}</h4>
            <p className="text-[10px] text-slate-400 leading-normal">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Developer details */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/15 text-left space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
          Engineering & Design Stack
        </h3>
        <p className="text-[10px] text-slate-400 leading-normal">
          Built with premium startup-grade frontend technologies for maximum execution speeds and responsive animations:
        </p>
        <ul className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 list-disc list-inside">
          <li>React + TypeScript v19</li>
          <li>Vite Development Tooling</li>
          <li>Tailwind CSS v4 Utilities</li>
          <li>Zustand State Store Hooks</li>
          <li>Framer Motion Core Animations</li>
          <li>Lucide Icon Assets Library</li>
        </ul>
      </div>
    </div>
  );
}
