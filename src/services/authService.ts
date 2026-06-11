import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../types/user';

export const authService = {
  async getSession() {
    return supabase.auth.getSession();
  },

  async login(email: string, password?: string) {
    if (!password) throw new Error('Password is required');
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp(email: string, password: string, name: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
  },

  async logout() {
    return supabase.auth.signOut();
  },

  async fetchProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error || !data) return null;
    return {
      name: data.name || '',
      email: data.email || '',
      avatar: data.avatar || '',
      role: data.role || 'Team Member',
      theme: (data.theme as 'dark' | 'light' | 'amoled') || 'dark',
      notificationsEnabled: data.notifications_enabled,
      marketingEmails: data.marketing_emails,
      language: data.language || 'English',
      timezone: data.timezone || 'UTC-5 (EST)',
      efficiencyIndex: data.efficiency_index,
      focusScore: data.focus_score,
      completionRate: data.completion_rate,
    };
  },

  async updateProfile(userId: string, profileUpdates: Partial<UserProfile>) {
    const payload: any = {};
    if (profileUpdates.name !== undefined) payload.name = profileUpdates.name;
    if (profileUpdates.avatar !== undefined) payload.avatar = profileUpdates.avatar;
    if (profileUpdates.role !== undefined) payload.role = profileUpdates.role;
    if (profileUpdates.theme !== undefined) payload.theme = profileUpdates.theme;
    if (profileUpdates.notificationsEnabled !== undefined) payload.notifications_enabled = profileUpdates.notificationsEnabled;
    if (profileUpdates.marketingEmails !== undefined) payload.marketing_emails = profileUpdates.marketingEmails;
    if (profileUpdates.language !== undefined) payload.language = profileUpdates.language;
    if (profileUpdates.timezone !== undefined) payload.timezone = profileUpdates.timezone;

    return supabase.from('profiles').update(payload).eq('id', userId);
  }
};
