import type { StateCreator } from 'zustand';

export interface PomodoroSession {
  id: string;
  duration: number; // in minutes
  category: string;
  date: string;
}

export interface AnalyticsSlice {
  focusHistory: PomodoroSession[];
  pomodoroMinutesToday: number;
  addFocusSession: (duration: number, category: string) => void;
}

export const createAnalyticsSlice: StateCreator<any, [], [], AnalyticsSlice> = (set) => ({
  focusHistory: [],
  pomodoroMinutesToday: 110, // Seed data minutes

  addFocusSession: (duration, category) => {
    const newSession: PomodoroSession = {
      id: `f-${Date.now()}`,
      duration,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    set((state: any) => ({
      focusHistory: [newSession, ...state.focusHistory],
      pomodoroMinutesToday: state.pomodoroMinutesToday + duration
    }));
  }
});
