import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Keyboard, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function SettingsPage() {
  const { user, updateProfile } = useStore();

  const [theme, setTheme] = useState(user.theme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notificationsEnabled);
  const [marketingEmails, setMarketingEmails] = useState(user.marketingEmails);
  const [language, setLanguage] = useState(user.language);
  const [timezone, setTimezone] = useState(user.timezone);
  
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      theme,
      notificationsEnabled,
      marketingEmails,
      language,
      timezone
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-brand-purple" />
          App Preferences
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure global display settings, notification schedules, and localizations.</p>
      </div>

      <div className="max-w-3xl glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15">
        
        {success && (
          <div className="p-3 mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            Workspace settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Appearance */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
              <Keyboard className="w-4 h-4 text-brand-purple" />
              Theme Appearance
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'dark', name: 'Slate Dark', desc: 'Standard dark modern theme' },
                { id: 'amoled', name: 'AMOLED Black', desc: 'Deep high contrast black' },
                { id: 'light', name: 'Light Glow', desc: 'Soft bright glow elements (Disabled)' }
              ].map((t) => {
                const active = theme === t.id;
                const disabled = t.id === 'light';
                return (
                  <div
                    key={t.id}
                    onClick={() => !disabled && setTheme(t.id as any)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      disabled 
                        ? 'opacity-40 cursor-not-allowed border-white/5 bg-transparent' 
                        : active
                          ? 'bg-brand-purple/20 border-brand-purple/40 text-white'
                          : 'bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.name}</span>
                    <span className="text-[9px] text-slate-500 mt-0.5 block">{t.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Notifications */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
              <Bell className="w-4 h-4 text-brand-purple" />
              Notification Triggers
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-colors">
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-200 block">Workspace Notifications</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Toggle task reminders, deadline warnings, and team edits.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-brand-purple focus:ring-brand-purple"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-colors">
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-200 block">Marketing & Product Emails</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Receive digests, newsletters, and tips from our productivity team.</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-brand-purple focus:ring-brand-purple"
                />
              </label>
            </div>
          </div>

          {/* Section 3: Localization */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
              <Globe className="w-4 h-4 text-brand-purple" />
              Localization & Regional Settings
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300">Default Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
                >
                  <option value="English">English (US)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                  <option value="German">German (Deutsch)</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300">Time Zone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
                >
                  <option value="UTC-5 (EST)">UTC-5 (EST - New York)</option>
                  <option value="UTC+0 (GMT)">UTC+0 (GMT - London)</option>
                  <option value="UTC+1 (CET)">UTC+1 (CET - Paris)</option>
                  <option value="UTC+5:30 (IST)">UTC+5:30 (IST - Mumbai)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Privacy */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
              <Shield className="w-4 h-4 text-brand-purple" />
              Data Privacy & Security
            </h3>
            
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-left">
              <span className="text-xs font-semibold text-slate-200 block">Workspace visibility</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Your workspace is currently set to <b>Private</b>. Team members invited to your board will be able to see shared tasks, project progress bars, and collaboration comments. Under no circumstances is your data shared or sold.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}
