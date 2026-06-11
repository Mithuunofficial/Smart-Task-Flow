import type { StateCreator } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  theme: 'dark' | 'light' | 'amoled';
  notificationsEnabled: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
  efficiencyIndex: number;
  focusScore: number;
  completionRate: number;
}

export interface AuthSlice {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  initializeAuth: () => void;
}

export const createAuthSlice: StateCreator<any, [], [], AuthSlice> = (set, get) => ({
  user: {
    name: '',
    email: '',
    avatar: '',
    role: '',
    theme: 'dark',
    notificationsEnabled: false,
    marketingEmails: false,
    language: 'English',
    timezone: 'UTC',
    efficiencyIndex: 0,
    focusScore: 0,
    completionRate: 0
  },
  isAuthenticated: false,

  initializeAuth: () => {
    console.log('authStore: initializeAuth called. isSupabaseConfigured =', isSupabaseConfigured);
    if (!isSupabaseConfigured) {
      const isSimulatedAuthed = localStorage.getItem('smart_task_simulated_auth') === 'true';
      if (isSimulatedAuthed) {
        set({ isAuthenticated: true });
      }
      return;
    }
    
    supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('authStore: onAuthStateChange callback fired. Event:', _event, 'Has Session:', !!session);
      if (session) {
        set({ isAuthenticated: true });
        const userId = session.user.id;

        // Fetch profile
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          if (error) console.warn('Error fetching profile:', error.message);
          if (profileData) {
            set({
              user: {
                name: profileData.name || '',
                email: profileData.email || '',
                avatar: profileData.avatar || '',
                role: profileData.role || 'Team Member',
                theme: (profileData.theme as 'dark' | 'light' | 'amoled') || 'dark',
                notificationsEnabled: profileData.notifications_enabled,
                marketingEmails: profileData.marketing_emails,
                language: profileData.language || 'English',
                timezone: profileData.timezone || 'UTC-5 (EST)',
                efficiencyIndex: profileData.efficiency_index,
                focusScore: profileData.focus_score,
                completionRate: profileData.completion_rate,
              }
            });
          }
        } catch (err: any) {
          console.error('authStore: Uncaught error in profile fetch:', err);
        }

        // Fetch Tasks from taskStore
        if (get().loadTasksFromSupabase) {
          await get().loadTasksFromSupabase(userId);
        }
        
        // Fetch Team Members
        if (get().loadTeamMembersFromSupabase) {
          await get().loadTeamMembersFromSupabase(userId);
        }

        // Fetch Announcements
        if (get().loadAnnouncementsFromSupabase) {
          await get().loadAnnouncementsFromSupabase();
        }

      } else {
        set({
          isAuthenticated: false,
          tasks: [],
          teamMembers: [],
          user: {
            name: '',
            email: '',
            avatar: '',
            role: '',
            theme: 'dark',
            notificationsEnabled: false,
            marketingEmails: false,
            language: 'English',
            timezone: 'UTC',
            efficiencyIndex: 0,
            focusScore: 0,
            completionRate: 0
          }
        });
      }
    });
  },

  login: async (email, password) => {
    console.log('authStore: login action invoked.');
    if (!password) return { error: new Error('Password is required') };

    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase configuration parameters are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment variables.') };
    }

    try {
      const loginPromise = supabase.auth.signInWithPassword({ email, password });
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Authentication connection timed out.')), 6000)
      );

      const { data, error } = await Promise.race([loginPromise, timeoutPromise]);
      if (!error && data?.user) {
        set({ isAuthenticated: true });
      }
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  },

  signUp: async (email, password, name) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase configuration parameters are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment variables.') };
    }

    try {
      const signUpPromise = supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Registration connection timed out.')), 6000)
      );

      const { data, error } = await Promise.race([signUpPromise, timeoutPromise]);
      if (!error && data?.user && data.session) {
        set({ isAuthenticated: true });
      }
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  },

  logout: async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('smart_task_simulated_auth');
      set({ isAuthenticated: false });
      return;
    }
    await supabase.auth.signOut();
  },

  updateProfile: async (profile) => {
    set((state: any) => ({
      user: { ...state.user, ...profile }
    }));

    if (!isSupabaseConfigured) return;

    const session = (await supabase.auth.getSession()).data.session;
    const userId = session?.user?.id;
    if (!userId) return;

    const updatePayload: any = {};
    if (profile.name !== undefined) updatePayload.name = profile.name;
    if (profile.avatar !== undefined) updatePayload.avatar = profile.avatar;
    if (profile.role !== undefined) updatePayload.role = profile.role;
    if (profile.theme !== undefined) updatePayload.theme = profile.theme;
    if (profile.notificationsEnabled !== undefined) updatePayload.notifications_enabled = profile.notificationsEnabled;
    if (profile.marketingEmails !== undefined) updatePayload.marketing_emails = profile.marketingEmails;
    if (profile.language !== undefined) updatePayload.language = profile.language;
    if (profile.timezone !== undefined) updatePayload.timezone = profile.timezone;

    await supabase.from('profiles').update(updatePayload).eq('id', userId);
  }
});
