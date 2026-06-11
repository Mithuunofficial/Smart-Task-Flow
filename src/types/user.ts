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
