import React, { useState } from 'react';
import { User, Camera, Shield, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ProfilePage() {
  const { user, updateProfile } = useStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  
  // Password states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notice banners
  const [success, setSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, role });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setError('');
    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleAvatarChange = () => {
    // Simulated upload of new avatar
    const randomAvatars = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
    ];
    const pick = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
    updateProfile({ avatar: pick });
  };

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Header title */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <User className="w-6 h-6 text-brand-purple" />
          My Profile settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure your account credentials, avatar imagery, and profile tags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Avatar upload & account summary */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 flex flex-col items-center justify-between text-center min-h-[300px]">
          <div className="space-y-4 flex flex-col items-center">
            {/* Avatar container with hover upload */}
            <div className="relative group cursor-pointer w-24 h-24 rounded-2xl border-2 border-white/10 overflow-hidden" onClick={handleAvatarChange}>
              <img src={user.avatar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
              <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 mb-1" />
                <span className="text-[9px] uppercase font-bold tracking-wider">Change</span>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">{user.name}</h3>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">{user.role}</p>
            </div>
          </div>

          {/* Efficiency tags */}
          <div className="w-full border-t border-white/5 pt-4 mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded-xl text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase block">Efficiency</span>
              <span className="text-base font-extrabold text-white mt-1 block">{user.efficiencyIndex}%</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase block">Focus Rating</span>
              <span className="text-base font-extrabold text-white mt-1 block">{user.focusScore}/100</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Form 1: Profile Details */}
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 text-left">
            <h3 className="text-sm font-bold text-white font-display mb-4 flex items-center gap-1.5">
              <User className="w-4.5 h-4.5 text-brand-purple" />
              Personal Details
            </h3>

            {success && (
              <div className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Profile details updated successfully!
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Display Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Save Details
              </button>
            </form>
          </div>

          {/* Form 2: Password Details */}
          <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-950/15 text-left">
            <h3 className="text-sm font-bold text-white font-display mb-4 flex items-center gap-1.5">
              <Shield className="w-4.5 h-4.5 text-brand-purple" />
              Change Credentials
            </h3>

            {passwordSuccess && (
              <div className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Password reset complete. Keep it safe.
              </div>
            )}
            {error && (
              <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Old Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-brand-purple/50 focus:outline-none text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
