import type { PomodoroSession } from '../types/analytics';

export const dummyAnalyticsSessions: PomodoroSession[] = [
  {
    id: 'f-1',
    duration: 25,
    category: 'Development',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0] // yesterday
  },
  {
    id: 'f-2',
    duration: 25,
    category: 'Development',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0] // yesterday
  },
  {
    id: 'f-3',
    duration: 25,
    category: 'Design',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] // 2 days ago
  },
  {
    id: 'f-4',
    duration: 35,
    category: 'Admin',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0] // 3 days ago
  }
];
