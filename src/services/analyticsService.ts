import type { PomodoroSession } from '../types/analytics';

export const analyticsService = {
  // Focus stats and graphs mock integration
  async fetchFocusHistory(): Promise<PomodoroSession[]> {
    const data = localStorage.getItem('smart_task_focus_history');
    return data ? JSON.parse(data) : [];
  },

  async saveFocusSession(duration: number, category: string): Promise<PomodoroSession> {
    const history = await this.fetchFocusHistory();
    const newSession: PomodoroSession = {
      id: `f-${Date.now()}`,
      duration,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('smart_task_focus_history', JSON.stringify([newSession, ...history]));
    return newSession;
  },

  calculateEfficiencyScore(completedTasksCount: number, streakDays: number): number {
    const base = 70;
    const taskBonus = Math.min(20, completedTasksCount * 2);
    const streakBonus = Math.min(10, streakDays * 1);
    return Math.min(100, base + taskBonus + streakBonus);
  }
};
