import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Bell, 
  LayoutDashboard, 
  CheckSquare, 
  BrainCircuit, 
  Calendar, 
  BarChart3, 
  Clock, 
  Activity, 
  Users, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Info
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, notifications } = useStore();

  const isActive = (path: string) => location.pathname === path;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'AI Prioritizer', path: '/ai-priority', icon: BrainCircuit, highlight: true },
    { name: 'Smart Scheduler', path: '/scheduler', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Pomodoro Focus', path: '/focus', icon: Clock },
    { name: 'Habit Tracker', path: '/habits', icon: Activity },
    { name: 'Team Collaboration', path: '/team', icon: Users },
  ];

  const secondaryMenuItems = [
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadNotifsCount },
    { name: 'Profile Settings', path: '/profile', icon: User },
    { name: 'App Preferences', path: '/settings', icon: Settings },
    { name: 'Help & Support', path: '/support', icon: HelpCircle },
    { name: 'About App', path: '/about', icon: Info },
  ];

  return (
    <>
      {/* 1. SIDEBAR FOR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 bg-slate-950/45 backdrop-blur-xl relative z-20">
        {/* Brand */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link to="/dashboard" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-8.5 h-8.5 overflow-hidden">
              <img src="/logo.png" className="w-8.5 h-8.5 object-contain" alt="" />
            </div>
            <span className="text-md font-bold font-display tracking-tight text-white">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Task Flow</span>
            </span>
          </Link>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-brand-purple/15 text-white border border-brand-purple/20 shadow-md shadow-brand-purple/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-brand-purple' : 'text-slate-400 group-hover:text-white'}`} />
                    {item.name}
                  </span>
                  {item.highlight && (
                    <span className="flex items-center justify-center text-[9px] px-1.5 py-0.5 rounded bg-brand-purple text-white uppercase font-bold tracking-wider animate-pulse">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Secondary Menu */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Preferences</p>
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-brand-purple/15 text-white border border-brand-purple/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-brand-purple' : 'text-slate-400 group-hover:text-white'}`} />
                    {item.name}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-[9px] font-bold rounded-full bg-brand-purple/80 text-white border border-brand-purple/25">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User profile section at bottom */}
        <div className="p-4 border-t border-white/5 bg-slate-950/20">
          <div className="flex items-center justify-between">
            <Link to="/profile" className="flex items-center gap-2.5 group overflow-hidden max-w-[170px]">
              <img src={user.avatar} className="w-8.5 h-8.5 rounded-xl border border-white/10 group-hover:border-brand-purple/40 transition-colors" alt={user.name} />
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-white group-hover:text-brand-purple truncate transition-colors">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.role}</p>
              </div>
            </Link>
            <button 
              onClick={() => { logout(); navigate('/'); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. DRAWER FOR MOBILE SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            {/* Sidebar Body */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-64 max-w-xs bg-slate-950 border-r border-white/5 flex flex-col p-6 h-full z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Brand */}
              <div className="flex items-center space-x-2.5 mb-8">
                <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" className="w-8 h-8 object-contain" alt="" />
                </div>
                <span className="text-base font-bold font-display text-white">Smart Task Flow</span>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto space-y-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace</p>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${
                        isActive(item.path)
                          ? 'bg-brand-purple/15 text-white border border-brand-purple/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Preferences</p>
                  {secondaryMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${
                        isActive(item.path)
                          ? 'bg-brand-purple/15 text-white border border-brand-purple/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Profile Card Bottom */}
              <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</p>
                    <p className="text-[9px] text-slate-500 truncate max-w-[120px]">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
