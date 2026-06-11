import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, MessageSquare, FolderKanban, Send } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { TeamMember } from '../../store/useStore';
import { Modal } from '../../components/common/Modal';
import { GlassCard } from '../../components/common/Card';

export default function TeamPage() {
  const { teamMembers, comments, addComment, addTeamMember, tasks } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<TeamMember['status']>('Active');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !email.trim()) return;

    addTeamMember({
      name,
      role,
      email,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*100000)}?w=100`,
      status,
      recentActivity: 'Joined the workspace team.'
    });

    setIsModalOpen(false);
    setName('');
    setRole('');
    setEmail('');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    addComment('global-chat', chatMessage);
    setChatMessage('');
  };

  const projects = [
    { title: 'Core App Dashboard', tasksCount: tasks.filter(t => t.category === 'Design' || t.category === 'Development').length, progress: 65, color: 'from-violet-500 to-indigo-500' },
    { title: 'AI Recommendation Dev', tasksCount: tasks.filter(t => t.priority === 'High').length, progress: 40, color: 'from-cyan-500 to-blue-500' },
    { title: 'Q2 Marketing Launch', tasksCount: tasks.filter(t => t.category === 'Marketing').length, progress: 20, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-purple" />
            Team Collaboration
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage team members, roles, active projects, and chat updates.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Projects cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <GlassCard key={idx} glowColor="purple" className="space-y-3 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${proj.color}`} />
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                <FolderKanban className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-none">{proj.title}</h4>
                <span className="text-[9px] text-slate-500 mt-1 block">{proj.tasksCount} active tasks</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-[9px] font-bold">
                <span className="text-slate-500">Progress</span>
                <span className="text-white">{proj.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${proj.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-brand-purple"
                />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main split columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Team members list & status */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-white font-display">Directory ({teamMembers.length} members)</h3>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {teamMembers.map((member) => {
              const statusColors = {
                Active: 'bg-green-400',
                Away: 'bg-amber-400',
                'In Meeting': 'bg-brand-purple',
                Offline: 'bg-slate-500'
              }[member.status] || 'bg-slate-500';

              return (
                <div key={member.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between gap-2 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative shrink-0">
                      <img src={member.avatar} className="w-9 h-9 rounded-xl border border-white/5" alt={member.name} />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-slate-950 ${statusColors}`} />
                    </div>
                    
                    <div className="text-left overflow-hidden">
                      <span className="text-xs font-bold text-white block truncate">{member.name}</span>
                      <span className="text-[9px] text-slate-500 block truncate">{member.role} • {member.email}</span>
                    </div>
                  </div>

                  <span className="text-[8px] bg-slate-800 border border-white/5 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-slate-400">
                    {member.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Chat comments */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
              <MessageSquare className="w-4.5 h-4.5 text-brand-purple" />
              Simulated Team Chat
            </h3>
            <span className="text-[9px] bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
              Live Feed
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 text-left">
                <img src={comment.userAvatar} className="w-8.5 h-8.5 rounded-xl border border-white/5 shrink-0" alt="" />
                <div className="flex-1 bg-white/5 border border-white/5 p-3 rounded-xl">
                  <div className="flex justify-between items-center text-[9px] font-bold mb-1">
                    <span className="text-slate-300">{comment.userName}</span>
                    <span className="text-slate-500 font-normal">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendChat} className="flex gap-2 pt-3 border-t border-white/5">
            <input
              type="text"
              placeholder="Send updates to workspace..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-grow px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
            />
            <button
              type="submit"
              className="p-2 bg-brand-purple rounded-xl text-white hover:bg-brand-purple/80 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* ADD MEMBER MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Invite Team Member">
        <form onSubmit={handleAddMember} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Liam Sterling"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Role / Designation</label>
            <input
              type="text"
              required
              placeholder="e.g. Backend Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="liam@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none placeholder-slate-600 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Default Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TeamMember['status'])}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
            >
              <option value="Active">Active</option>
              <option value="Away">Away</option>
              <option value="In Meeting">In Meeting</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 text-white cursor-pointer"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
