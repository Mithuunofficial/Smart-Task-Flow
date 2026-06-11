import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Bell, 
  CheckSquare, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, tasks, notifications, markNotificationAsRead } = useStore();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close menus when location changes
  useEffect(() => {
    setSidebarOpen(false);
    setNotifDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Search filter
  const filteredTasks = searchQuery 
    ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const unreadNotifs = notifications.filter(n => !n.read);

  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 flex overflow-hidden selection:bg-brand-purple/30 selection:text-white">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
      
      {/* Glowing Vignette Effect */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none z-0" />

      {/* SIDEBAR Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        
        {/* TOP NAVBAR CONTAINER */}
        <header className="h-16 border-b border-white/5 bg-slate-950/20 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 relative z-30">
          
          {/* Mobile hamburger menu & active page details */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 lg:hidden rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Workspace</span>
              <span>/</span>
              <span className="capitalize font-semibold text-white">
                {location.pathname.substring(1).replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Interactive tools panel: Search, Notifications, Profile dropdown */}
          <div className="flex items-center gap-3">
            
            {/* Global search launcher */}
            <button 
              onClick={() => setSearchModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 glass-panel text-slate-400 hover:text-white text-xs transition-colors w-48 lg:w-64 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-left flex-1 text-[11px]">Search workspace...</span>
              <kbd className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-white/5">⌘K</kbd>
            </button>
            
            <button 
              onClick={() => setSearchModalOpen(true)}
              className="p-2 sm:hidden rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Notification Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer relative ${notifDropdownOpen ? 'bg-white/5 text-white' : ''}`}
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-purple rounded-full border border-slate-950 animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {notifDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 glass-panel-heavy border border-white/10 rounded-2xl shadow-2xl z-40 p-4"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          Notifications
                          {unreadNotifs.length > 0 && (
                            <span className="bg-brand-purple/20 text-brand-purple text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                              {unreadNotifs.length} new
                            </span>
                          )}
                        </span>
                        <Link to="/notifications" className="text-[10px] text-brand-purple hover:underline" onClick={() => setNotifDropdownOpen(false)}>
                          View all
                        </Link>
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {notifications.length === 0 ? (
                          <p className="text-[11px] text-slate-500 py-6 text-center">No notifications found.</p>
                        ) : (
                          notifications.slice(0, 4).map((notif) => (
                            <div 
                              key={notif.id}
                              onClick={() => markNotificationAsRead(notif.id)}
                              className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                                notif.read 
                                  ? 'bg-transparent border-transparent opacity-60' 
                                  : 'bg-white/5 border-white/5 hover:border-brand-purple/20'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className={`text-[11px] font-bold text-white ${notif.read ? 'font-normal text-slate-300' : ''}`}>
                                  {notif.title}
                                </span>
                                <span className="text-[8px] text-slate-500 shrink-0">{notif.time}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
              >
                <img src={user.avatar} className="w-8.5 h-8.5 rounded-xl border border-white/5" alt="" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 glass-panel-heavy border border-white/10 rounded-2xl shadow-2xl z-40 p-2 overflow-hidden text-left"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{user.email}</p>
                      </div>
                      
                      <div className="p-1 space-y-0.5">
                        <Link 
                          to="/profile" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          Profile Settings
                        </Link>
                        <Link 
                          to="/settings" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          App Settings
                        </Link>
                        <Link 
                          to="/support" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <HelpCircle className="w-4 h-4 text-slate-400" />
                          Support Desk
                        </Link>
                      </div>

                      <div className="p-1 border-t border-white/5">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT CONTAINER (WITH ROUTE TRANSITIONS) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* WORKSPACE SEARCH DIALOG MODAL */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSearchModalOpen(false); setSearchQuery(''); }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="relative w-full max-w-xl glass-panel-heavy border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <Search className="w-5 h-5 text-brand-purple shrink-0" />
                <input
                  type="text"
                  placeholder="Find tasks by title, project or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 p-0 text-sm text-white focus:ring-0 w-full focus:outline-none placeholder-slate-500"
                  autoFocus
                />
                <button 
                  onClick={() => { setSearchModalOpen(false); setSearchQuery(''); }}
                  className="text-slate-500 hover:text-white text-xs font-semibold px-2 py-1 bg-white/5 rounded"
                >
                  ESC
                </button>
              </div>
              
              <div className="p-4 max-h-72 overflow-y-auto">
                {searchQuery === '' ? (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-400">Search for tasks like <span className="text-brand-purple font-semibold">"Configure"</span> or <span className="text-brand-purple font-semibold">"Design"</span>.</p>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-500">No matching tasks found.</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tasks</p>
                    {filteredTasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          setSearchQuery('');
                          navigate('/tasks');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <CheckSquare className={`w-4 h-4 ${task.status === 'Completed' ? 'text-green-400' : 'text-slate-400'}`} />
                          <div>
                            <p className={`text-xs font-semibold ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>{task.title}</p>
                            <span className="text-[9px] text-slate-500">@{task.category}</span>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-semibold">
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
