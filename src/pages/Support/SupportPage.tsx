import React, { useState } from 'react';
import { HelpCircle, Search, Mail, BookOpen, Send, Check } from 'lucide-react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // FAQ mock data
  const faqs = [
    { q: 'How does the AI prioritizing index calculate scores?', a: 'Our engine evaluates priority parameters (High, Medium, Low) alongside proximity to due dates. Tasks due immediately receive substantial scoring multipliers to prevent cycle blockages.' },
    { q: 'Can I invite members without an email invite?', a: 'Currently, invitations are simulated. Creating a member inside the collaboration portal immediately populates them inside your directory with a simulated active state.' },
    { q: 'How do I synchronize my calendars?', a: 'Smart Scheduler compiles tasks within our native dashboard planner. External synchronization (Google Calendar, Outlook) can be configured by toggling data sharing rules.' },
    { q: 'Is my focus data shared with any external databases?', a: 'Absolutely not. All metrics, session histories, habits tracked, and team logs are kept locally inside your private workspace sandbox.' }
  ];

  const filteredFaqs = faqs.filter(
    (faq) => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
             faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-brand-purple" />
          Help & Support
        </h1>
        <p className="text-xs text-slate-400 mt-1">Browse frequently asked questions, read documentation cards, or message our support crew.</p>
      </div>

      {/* Docs Quick cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'API Documentation', desc: 'Integrate Smart Task Flow triggers into external systems.', links: 'Read Guides' },
          { title: 'Keyboard Shortcuts', desc: 'Optimize workflows with global hotkeys and workspace commands.', links: 'View Cheat Sheet' },
          { title: 'Release Notes', desc: 'See details of the latest system changes and engine tuning.', links: 'Read Changelog' }
        ].map((doc, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-950/15 space-y-3 text-left">
            <BookOpen className="w-5 h-5 text-brand-purple" />
            <h4 className="text-xs font-bold text-white">{doc.title}</h4>
            <p className="text-[10px] text-slate-400 leading-normal">{doc.desc}</p>
            <span className="text-[10px] font-bold text-brand-purple hover:underline cursor-pointer block pt-1">{doc.links} →</span>
          </div>
        ))}
      </div>

      {/* Split FAQs vs Ticket Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: FAQ accordion list */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 space-y-4">
          <h3 className="text-sm font-bold text-white font-display pb-2 border-b border-white/5 flex items-center justify-between">
            <span>Frequently Asked Questions</span>
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1 text-[10px] rounded-lg bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
              />
            </div>
          </h3>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {filteredFaqs.length === 0 ? (
              <p className="text-[11px] text-slate-500 py-12 text-center">No questions match your query.</p>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1 text-left">
                  <span className="text-xs font-bold text-white block">{faq.q}</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed pt-1">{faq.a}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Submit ticket form */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/15 flex flex-col justify-between">
          <div className="border-b border-white/5 pb-2 mb-4">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
              <Mail className="w-4.5 h-4.5 text-brand-purple" />
              Submit Help Ticket
            </h3>
          </div>

          {success && (
            <div className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Ticket submitted! We will respond shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Liam Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Describe Issue</label>
              <textarea
                rows={3}
                required
                placeholder="Write your issue details here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending ticket...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
