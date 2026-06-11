import type { UserProfile } from '../types/user';
import type { TeamMember } from '../types/task';

export const dummyCurrentUser: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex@email.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  role: 'Lead Architect',
  theme: 'dark',
  notificationsEnabled: true,
  marketingEmails: false,
  language: 'English',
  timezone: 'UTC-5 (EST)',
  efficiencyIndex: 94,
  focusScore: 88,
  completionRate: 85
};

export const dummyTeamMembers: TeamMember[] = [
  {
    id: 'm-1',
    name: 'Sarah Connor',
    role: 'Product Owner',
    email: 'sarah@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'Active',
    recentActivity: 'Updated milestone deadlines'
  },
  {
    id: 'm-2',
    name: 'John Doe',
    role: 'Senior Developer',
    email: 'john@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'In Meeting',
    recentActivity: 'Reviewing pull requests'
  },
  {
    id: 'm-3',
    name: 'Emma Watson',
    role: 'UI Designer',
    email: 'emma@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'Away',
    recentActivity: 'Working on Focus Page mocks'
  }
];
