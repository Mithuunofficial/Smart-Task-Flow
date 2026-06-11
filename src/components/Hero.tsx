import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Check, 
  Search, 
  Bell, 
  Plus, 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  FolderKanban, 
  BarChart3, 
  Mail, 
  Settings,
  Sparkles,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  project: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export default function Hero() {
  // Task list state for the interactive dashboard mockup
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design landing page', project: 'Web Project', time: '9:30 AM', priority: 'High', completed: false },
    { id: 2, title: 'Review project proposal', project: 'Work', time: '11:00 AM', priority: 'Medium', completed: false },
    { id: 3, title: 'Team stand-up meeting', project: 'Meetings', time: '12:00 PM', priority: 'Low', completed: true },
    { id: 4, title: 'Update product roadmap', project: 'Product', time: '2:30 PM', priority: 'High', completed: false },
    { id: 5, title: 'Write documentation', project: 'Docs', time: '4:00 PM', priority: 'Medium', completed: false }
  ]);

  // Pomodoro Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const timerInterval = useRef<any>(null);

  // Suggestions Modal/Drawer State
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Sparkline mock data SVG paths
  const sparklinePaths = {
    tasksToday: "M 0 25 Q 10 5, 20 20 T 40 10 T 60 18 T 80 5 T 100 12",
    inProgress: "M 0 20 Q 15 30, 30 10 T 60 25 T 90 8 T 100 18",
    completed: "M 0 30 Q 10 20, 25 28 T 50 10 T 75 18 T 100 2",
    focusTime: "M 0 15 Q 15 5, 30 25 T 60 12 T 90 20 T 100 5"
  };

  // Toggle Task Completion
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Pomodoro Timer Tick Handler
  useEffect(() => {
    if (timerActive) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerInterval.current) clearInterval(timerInterval.current);
            return 25 * 60; // Reset
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerInterval.current) clearInterval(timerInterval.current);
    }

    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [timerActive]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SVG circular timer progress variables
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = ((25 * 60 - timeLeft) / (25 * 60));
  const strokeDashoffset = circumference - (progressPercent * circumference);

  // Dynamic Dashboard Stats
  const totalCompleted = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const totalInProgress = totalTasks - totalCompleted;

  // Calculate Priority counts
  const highPriorityLeft = tasks.filter(t => t.priority === 'High' && !t.completed).length;

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-dot-pattern" id="hero">
      {/* Floating Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-brand-blue/10 rounded-full blur-[130px] animate-pulse-slow pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-8 text-left">
            {/* AI Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-brand-purple/30 text-xs font-semibold text-violet-300 shadow-md shadow-brand-purple/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
              <span>AI-Powered Productivity</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.15] tracking-tight text-white"
            >
              Plan Smarter.<br />
              Organize Better.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                Achieve More.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
            >
              Smart Task Flow uses AI to prioritize tasks, optimize schedules, and help users stay productive effortlessly.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link 
                to="/register"
                className="relative inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-lg shadow-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a 
                href="#workflow"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-300 rounded-xl glass-panel hover:bg-white/5 border border-white/5 hover:border-white/10 hover:text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] gap-2"
              >
                <Play className="w-4 h-4 text-brand-purple fill-brand-purple/20" />
                Watch Demo
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-white/5 w-full sm:w-auto"
            >
              {/* Avatars */}
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full ring-2 ring-brand-bg object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="User Avatar" />
                <img className="w-9 h-9 rounded-full ring-2 ring-brand-bg object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="User Avatar" />
                <img className="w-9 h-9 rounded-full ring-2 ring-brand-bg object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="User Avatar" />
                <img className="w-9 h-9 rounded-full ring-2 ring-brand-bg object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" alt="User Avatar" />
              </div>
              
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Loved by <span className="text-white font-semibold">1,000+</span> productive people
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Interactive Mockup Dashboard) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 relative"
          >
            {/* Top right gradient ring decoration */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Outer Mockup Shell */}
            <div className="w-full rounded-2xl p-1.5 bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 shadow-2xl relative">
              <div className="rounded-xl overflow-hidden glass-panel-heavy grid grid-cols-12 h-[500px]">
                
                {/* Sidebar Navigation */}
                <div className="col-span-3 border-r border-white/5 bg-slate-950/40 p-4 flex flex-col justify-between hidden sm:flex">
                  <div className="space-y-6">
                    {/* Sidebar Brand */}
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex items-center justify-center w-7 h-7 overflow-hidden">
                        <img src="/logo.png" className="w-7 h-7 object-contain" alt="" />
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wide">Task Flow</span>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-white rounded-lg bg-brand-purple/20 border border-brand-purple/10 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 text-brand-purple" />
                        Dashboard
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <CheckSquare className="w-4 h-4" />
                        My Tasks
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <Calendar className="w-4 h-4" />
                        Calendar
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <FolderKanban className="w-4 h-4" />
                        Projects
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <Mail className="w-4 h-4" />
                        Inbox
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <Settings className="w-4 h-4" />
                        Settings
                      </div>
                    </div>
                  </div>

                  {/* Profile Card */}
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5">
                    <img className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Alex Johnson" />
                    <div className="text-left overflow-hidden">
                      <p className="text-[11px] font-semibold text-white truncate">Alex Johnson</p>
                      <p className="text-[9px] text-slate-500 truncate">alex@email.com</p>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Panel */}
                <div className="col-span-12 sm:col-span-9 p-4 flex flex-col space-y-4 overflow-y-auto bg-slate-950/20">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                        Good morning, Alex! 👋
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-400">Here's what's happening with your tasks today.</p>
                    </div>
                    {/* Header Actions */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center cursor-pointer text-slate-400 hover:text-white transition-colors">
                        <Search className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center relative cursor-pointer text-slate-400 hover:text-white transition-colors">
                        <Bell className="w-3.5 h-3.5" />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-purple rounded-full" />
                      </div>
                      <button className="w-7 h-7 rounded-lg bg-brand-purple flex items-center justify-center text-white hover:bg-brand-purple/80 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Analytics Cards Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {/* Card 1 */}
                    <div className="glass-panel p-2.5 rounded-xl text-left relative overflow-hidden group">
                      <span className="text-[10px] text-slate-400 font-medium block">Tasks Today</span>
                      <span className="text-base font-bold text-white block mt-0.5">{totalTasks - totalCompleted}</span>
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-green-400">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+20%</span>
                      </div>
                      {/* Mini Sparkline Chart */}
                      <svg className="absolute bottom-1 right-2 w-14 h-5 text-indigo-500/30 overflow-visible" viewBox="0 0 100 30">
                        <path d={sparklinePaths.tasksToday} fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    {/* Card 2 */}
                    <div className="glass-panel p-2.5 rounded-xl text-left relative overflow-hidden">
                      <span className="text-[10px] text-slate-400 font-medium block">In Progress</span>
                      <span className="text-base font-bold text-white block mt-0.5">{totalInProgress}</span>
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-violet-400">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+12%</span>
                      </div>
                      <svg className="absolute bottom-1 right-2 w-14 h-5 text-violet-500/30 overflow-visible" viewBox="0 0 100 30">
                        <path d={sparklinePaths.inProgress} fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    {/* Card 3 */}
                    <div className="glass-panel p-2.5 rounded-xl text-left relative overflow-hidden">
                      <span className="text-[10px] text-slate-400 font-medium block">Completed</span>
                      <span className="text-base font-bold text-white block mt-0.5">{24 + totalCompleted}</span>
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-green-400">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+30%</span>
                      </div>
                      <svg className="absolute bottom-1 right-2 w-14 h-5 text-emerald-500/30 overflow-visible" viewBox="0 0 100 30">
                        <path d={sparklinePaths.completed} fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    {/* Card 4 */}
                    <div className="glass-panel p-2.5 rounded-xl text-left relative overflow-hidden">
                      <span className="text-[10px] text-slate-400 font-medium block">Focus Time</span>
                      <span className="text-base font-bold text-white block mt-0.5">4.5h</span>
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-yellow-400">
                        <TrendingUp className="w-2.5 h-2.5" />
                        <span>+15%</span>
                      </div>
                      <svg className="absolute bottom-1 right-2 w-14 h-5 text-yellow-500/30 overflow-visible" viewBox="0 0 100 30">
                        <path d={sparklinePaths.focusTime} fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Columns Section */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
                    {/* Left Panel: Tasks list */}
                    <div className="glass-panel p-3.5 rounded-xl md:col-span-3 text-left">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-semibold text-white">Today's Tasks</h4>
                        <span className="text-[9px] text-brand-purple hover:underline cursor-pointer">View All</span>
                      </div>
                      
                      {/* Interactive Task Checklist */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {tasks.map(task => (
                          <div 
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                              task.completed 
                                ? 'bg-slate-900/40 border-white/5 opacity-55' 
                                : 'bg-white/5 border-white/5 hover:border-brand-purple/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              {/* Custom checkbox */}
                              <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-all duration-200 ${
                                task.completed 
                                  ? 'bg-brand-purple border-brand-purple text-white' 
                                  : 'border-slate-500 bg-transparent'
                              }`}>
                                {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              
                              <div className="text-left overflow-hidden">
                                <p className={`text-[11px] font-medium leading-none text-slate-200 transition-all ${
                                  task.completed ? 'line-through text-slate-500' : ''
                                }`}>
                                  {task.title}
                                </p>
                                <span className="text-[9px] text-slate-500 block mt-0.5">@ {task.project}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[9px] text-slate-500">{task.time}</span>
                              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                                task.priority === 'High' 
                                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/10' 
                                  : task.priority === 'Medium' 
                                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/10' 
                                    : 'bg-slate-500/15 text-slate-400 border border-white/5'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Pomodoro Timer & AI suggestions */}
                    <div className="md:col-span-2 flex flex-col gap-3.5">
                      
                      {/* Circular Timer Widget */}
                      <div className="glass-panel p-3.5 rounded-xl text-center flex flex-col items-center justify-between min-h-[140px]">
                        <span className="text-[10px] font-semibold text-slate-400 block mb-1">Focus Mode</span>
                        <div className="relative w-18 h-18 flex items-center justify-center">
                          {/* Timer Progress Circles */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle 
                              cx="36" cy="36" r={radius} 
                              className="stroke-slate-800 fill-none" 
                              strokeWidth="3.5" 
                            />
                            <circle 
                              cx="36" cy="36" r={radius} 
                              className="stroke-brand-purple fill-none transition-all duration-300" 
                              strokeWidth="3.5" 
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[13px] font-bold text-white leading-none">{formatTime(timeLeft)}</span>
                            <span className="text-[7px] text-slate-500 uppercase mt-0.5">Deep Work</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <button 
                            onClick={toggleTimer}
                            className="px-3 py-1 rounded-md text-[9px] font-semibold text-white bg-brand-purple hover:bg-brand-purple/80 transition-colors"
                          >
                            {timerActive ? 'Pause Focus' : 'Start Focus'}
                          </button>
                          <button 
                            onClick={resetTimer}
                            className="px-2 py-1 rounded-md text-[9px] font-semibold text-slate-300 glass-panel hover:bg-white/5 transition-colors"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      {/* AI suggestions panel */}
                      <div className="glass-panel p-3 rounded-xl text-left bg-gradient-to-br from-indigo-950/20 to-slate-950/20 relative overflow-hidden">
                        <div className="flex items-center gap-1.5 text-brand-purple mb-1">
                          <BrainCircuit className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wide">AI Suggestion</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-tight">
                          {highPriorityLeft > 0 
                            ? `You have ${highPriorityLeft} high-priority tasks remaining. We suggest tackling "${tasks.find(t => t.priority === 'High' && !t.completed)?.title || 'Design landing page'}" first.`
                            : 'All high priority tasks completed! Excellent momentum. Take a 5-minute break.'
                          }
                        </p>
                        <button 
                          onClick={() => setShowAiSuggestions(true)}
                          className="w-full text-center mt-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                          View Suggestions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side blurs */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-[70%] bg-brand-purple/20 blur-xl pointer-events-none" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[70%] bg-brand-blue/20 blur-xl pointer-events-none" />
            </div>

            {/* AI Suggestion Modal overlay within Hero context */}
            <AnimatePresence>
              {showAiSuggestions && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 rounded-2xl flex items-center justify-center p-6"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="glass-panel-heavy border border-white/10 rounded-xl p-5 max-w-sm w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-violet-400">
                        <Sparkles className="w-4 h-4" />
                        <h4 className="text-sm font-bold text-white font-display">Smart Task Suggestions</h4>
                      </div>
                      <button 
                        onClick={() => setShowAiSuggestions(false)}
                        className="text-slate-400 hover:text-white text-xs font-semibold p-1 hover:bg-white/5 rounded"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="p-2.5 rounded-lg bg-violet-600/15 border border-violet-500/10">
                        <p className="font-semibold text-violet-300">⚡ Prioritize Design</p>
                        <p className="mt-1 text-[11px] text-slate-400 leading-normal">Your energy focus peaks between 9 AM and 11 AM. Schedule "Design landing page" now.</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-indigo-600/15 border border-indigo-500/10">
                        <p className="font-semibold text-indigo-300">🗓️ Group Meetings</p>
                        <p className="mt-1 text-[11px] text-slate-400 leading-normal">"Team stand-up meeting" is at 12:00 PM. We recommend reviewing proposal documents 15 mins before.</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-600/15 border border-emerald-500/10">
                        <p className="font-semibold text-emerald-300">🔋 Rest Interval</p>
                        <p className="mt-1 text-[11px] text-slate-400 leading-normal">Based on 4.5h Focus Time, take a 10-minute active stretch break after your next Pomodoro session.</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
