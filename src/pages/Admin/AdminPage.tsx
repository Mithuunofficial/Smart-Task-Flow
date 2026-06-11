import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Megaphone, 
  ListTodo, 
  Compass, 
  LogOut, 
  Send,
  Loader2,
  Trash2,
  Lock,
  User
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface TaskData {
  id: string;
  user_id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  due_date: string;
}

interface TeamMemberData {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Admin database data
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Selected tab
  const [activeTab, setActiveTab] = useState<'users' | 'tasks' | 'team' | 'announcements'>('users');

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Handle local predefined authentication check
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    setTimeout(() => {
      if (username === 'Mithuun' && password === 'MithAdmin@1026') {
        setIsAdmin(true);
        localStorage.setItem('smart_task_admin_auth', 'true');
        fetchAdminData();
      } else {
        setAuthError('Access Denied. Invalid administrative credentials.');
      }
      setLoading(false);
    }, 800);
  };

  // Log out admin
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('smart_task_admin_auth');
    setProfiles([]);
    setTasks([]);
    setTeamMembers([]);
  };

  // Fetch admin telemetry from Supabase RPC functions
  const fetchAdminData = async () => {
    setDataLoading(true);
    setActionError('');
    
    console.log('fetchAdminData: Checking configuration. isSupabaseConfigured =', isSupabaseConfigured);
    if (!isSupabaseConfigured) {
      setActionError('Supabase configuration parameters are missing or using placeholders in the .env file. Please check your setup and restart your dev server (npm run dev).');
      setDataLoading(false);
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      console.log('fetchAdminData: Invoking get_admin_data RPC via native fetch...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const rpcResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/get_admin_data`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin_password: 'MithAdmin@1026' }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!rpcResponse.ok) {
        const errText = await rpcResponse.text();
        throw new Error(`RPC database fetch failed: ${errText}`);
      }

      const data = await rpcResponse.json();
      console.log('fetchAdminData: RPC completed successfully. Data:', data);

      if (data) {
        setProfiles(data.profiles || []);
        setTasks(data.tasks || []);
        setTeamMembers(data.team_members || []);
      }

      // 2. Fetch announcements list
      console.log('fetchAdminData: Fetching announcements list via native fetch...');
      const annController = new AbortController();
      const annTimeoutId = setTimeout(() => annController.abort(), 6000);

      const annResponse = await fetch(`${supabaseUrl}/rest/v1/announcements?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        signal: annController.signal
      });

      clearTimeout(annTimeoutId);

      if (!annResponse.ok) {
        const errText = await annResponse.text();
        throw new Error(`Announcements fetch failed: ${errText}`);
      }

      const annData = await annResponse.json();
      console.log('fetchAdminData: Announcements loaded. Data:', annData);
      setAnnouncements(annData || []);

    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setActionError(err.name === 'AbortError' ? 'Database connection timed out. Please check your network or Supabase tables.' : (err.message || 'Failed to fetch admin data from database.'));
    } finally {
      setDataLoading(false);
    }
  };

  // Check persistent admin status
  useEffect(() => {
    const isAuthed = localStorage.getItem('smart_task_admin_auth');
    if (isAuthed === 'true') {
      setIsAdmin(true);
      fetchAdminData();
    }
  }, []);

  // Delete User and Cascade
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${userName}"? This will delete their authentication account, tasks, and collaborator records.`)) {
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      setDataLoading(true);
      console.log('handleDeleteUser: Invoking delete_user_by_admin RPC...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/delete_user_by_admin`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_password: 'MithAdmin@1026',
          user_id_to_delete: userId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Delete RPC failed: ${errText}`);
      }

      console.log('handleDeleteUser: Cascade delete succeeded.');
      fetchAdminData();
    } catch (err: any) {
      console.error('Error deleting user:', err);
      alert(err.name === 'AbortError' ? 'Connection timed out while trying to delete user.' : (err.message || 'Failed to delete user.'));
      setDataLoading(false);
    }
  };

  // Broadcast announcement
  const handlePublishAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;

    setLoading(true);
    setAnnSuccess('');
    setActionError('');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      console.log('handlePublishAnnouncement: Invoking create_announcement_by_admin RPC...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/create_announcement_by_admin`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_password: 'MithAdmin@1026',
          title: annTitle,
          message: annMessage
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Announcement RPC failed: ${errText}`);
      }

      console.log('handlePublishAnnouncement: Announcement published successfully.');
      setAnnTitle('');
      setAnnMessage('');
      setAnnSuccess('Announcement broadcasted successfully to all users!');
      fetchAdminData();
    } catch (err: any) {
      console.error('Announcement publish error:', err);
      setActionError(err.name === 'AbortError' ? 'Connection timed out while publishing announcement.' : (err.message || 'Failed to publish announcement.'));
    } finally {
      setLoading(false);
    }
  };

  // Render Login Panel
  if (!isAdmin) {
    return (
      <div className="relative min-h-screen bg-brand-bg text-slate-100 flex items-center justify-center p-4 selection:bg-brand-purple/30 selection:text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm relative z-10"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 shadow-lg shadow-rose-600/20 mb-3">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold font-display text-white">Admin Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Authenticate using system credentials to inspect data</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden bg-brand-card">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-600 via-violet-600 to-indigo-600" />
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 text-left">
                  {authError}
                </div>
              )}
              
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-semibold text-slate-300">Admin Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-semibold text-slate-300">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus:outline-none transition-all placeholder-slate-600 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Checking Credentials...
                  </span>
                ) : (
                  <span>Access Terminal</span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 p-6 selection:bg-brand-purple/30 selection:text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-left">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <h1 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
              Administrative Workspace Terminal
            </h1>
            <p className="text-xs text-slate-400 mt-1">Real-time database analysis, cascades, and global system announcements.</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Global Error Notice */}
        {actionError && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/25 text-xs text-rose-400">
            {actionError}
          </div>
        )}

        {/* Metric Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/20">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Registered Users</span>
            <span className="text-2xl font-extrabold text-white block mt-1">{profiles.length}</span>
            <p className="text-[9px] text-slate-500 mt-1">Accounts in auth.users schema</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/20">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Tasks Created</span>
            <span className="text-2xl font-extrabold text-white block mt-1">{tasks.length}</span>
            <p className="text-[9px] text-slate-500 mt-1">Sprints created by active users</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/20">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Collaborators</span>
            <span className="text-2xl font-extrabold text-white block mt-1">{teamMembers.length}</span>
            <p className="text-[9px] text-slate-500 mt-1">Invited workspace directory records</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/20">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Global Announcements</span>
            <span className="text-2xl font-extrabold text-white block mt-1">{announcements.length}</span>
            <p className="text-[9px] text-slate-500 mt-1">Notifications published to users</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-1 glass-panel rounded-xl border border-white/5 bg-slate-950/15 w-fit">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'users' ? 'bg-rose-500/20 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Users Directory
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'tasks' ? 'bg-rose-500/20 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ListTodo className="w-3.5 h-3.5" />
              All User Tasks
            </span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'team' ? 'bg-rose-500/20 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Collaborators
            </span>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'announcements' ? 'bg-rose-500/20 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5" />
              Announcements
            </span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/10 min-h-[400px] p-5 relative">
          
          {dataLoading && (
            <div className="absolute inset-0 bg-brand-bg/65 flex items-center justify-center rounded-2xl z-20">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                <span className="text-xs text-slate-400 font-medium">Synchronizing database...</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white font-display">User Profiles ({profiles.length})</h3>
                  <button 
                    onClick={fetchAdminData} 
                    className="text-[10px] text-rose-400 hover:underline font-semibold"
                  >
                    Refresh List
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500">
                        <th className="py-2.5 font-semibold">Name</th>
                        <th className="py-2.5 font-semibold">Email</th>
                        <th className="py-2.5 font-semibold">User ID</th>
                        <th className="py-2.5 font-semibold">Registered</th>
                        <th className="py-2.5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-500">No registered users in profiles schema.</td>
                        </tr>
                      ) : (
                        profiles.map((profile) => (
                          <tr key={profile.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 font-semibold text-white">{profile.name}</td>
                            <td className="py-3 text-slate-300">{profile.email}</td>
                            <td className="py-3 text-slate-500 font-mono text-[10px]">{profile.id}</td>
                            <td className="py-3 text-slate-400">{new Date(profile.created_at).toLocaleDateString()}</td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleDeleteUser(profile.id, profile.name)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-[10px] text-rose-400 border border-rose-500/10 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Account
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white font-display">Tasks Master Log ({tasks.length})</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500">
                        <th className="py-2.5 font-semibold">Task Title</th>
                        <th className="py-2.5 font-semibold">User ID</th>
                        <th className="py-2.5 font-semibold">Category</th>
                        <th className="py-2.5 font-semibold">Priority</th>
                        <th className="py-2.5 font-semibold">Status</th>
                        <th className="py-2.5 font-semibold">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500">No tasks in database.</td>
                        </tr>
                      ) : (
                        tasks.map((task) => (
                          <tr key={task.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 font-semibold text-white">{task.title}</td>
                            <td className="py-3 text-slate-500 font-mono text-[10px]">{task.user_id}</td>
                            <td className="py-3"><span className="bg-white/5 px-2 py-0.5 rounded text-slate-400 font-medium">{task.category}</span></td>
                            <td className="py-3">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                              }`}>{task.priority}</span>
                            </td>
                            <td className="py-3">
                              <span className={`text-[10px] font-bold ${
                                task.status === 'Completed' ? 'text-green-400' : task.status === 'In Progress' ? 'text-violet-400' : 'text-slate-400'
                              }`}>{task.status}</span>
                            </td>
                            <td className="py-3 text-slate-400">{task.due_date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white font-display">Workspace Collaborators Directory ({teamMembers.length})</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500">
                        <th className="py-2.5 font-semibold">Collaborator Name</th>
                        <th className="py-2.5 font-semibold">Email</th>
                        <th className="py-2.5 font-semibold">Designated Role</th>
                        <th className="py-2.5 font-semibold">Invited By (User ID)</th>
                        <th className="py-2.5 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-500">No collaborator associations in database.</td>
                        </tr>
                      ) : (
                        teamMembers.map((member) => (
                          <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 font-semibold text-white">{member.name}</td>
                            <td className="py-3 text-slate-300">{member.email}</td>
                            <td className="py-3 text-slate-400">{member.role}</td>
                            <td className="py-3 text-slate-500 font-mono text-[10px]">{member.user_id}</td>
                            <td className="py-3"><span className="uppercase text-[9px] bg-slate-800 px-2 py-0.5 rounded font-bold tracking-wider text-slate-400">{member.status}</span></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* Left Side: Broadcast Form */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="pb-2 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white font-display">Broadcast Global Announcement</h3>
                  </div>

                  <form onSubmit={handlePublishAnnouncement} className="space-y-4">
                    {annSuccess && (
                      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                        {annSuccess}
                      </div>
                    )}

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-slate-300">Announcement Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. System Upgrade scheduled..."
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-rose-500/50 focus:outline-none placeholder-slate-600 text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-slate-300">Message Content</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail the update, server release notes, or alerts..."
                        value={annMessage}
                        onChange={(e) => setAnnMessage(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-rose-500/50 focus:outline-none placeholder-slate-600 text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      Publish Alert
                    </button>
                  </form>
                </div>

                {/* Right Side: Log */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="pb-2 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white font-display font-display">Announcement Broadcast Log</h3>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {announcements.length === 0 ? (
                      <p className="text-xs text-slate-500 py-16 text-center">No alerts published yet.</p>
                    ) : (
                      announcements.map((ann) => (
                        <div key={ann.id} className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1 text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-200">{ann.title}</span>
                            <span className="text-[9px] text-slate-500">{new Date(ann.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{ann.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
