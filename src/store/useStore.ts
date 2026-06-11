import { create } from 'zustand';
import { createAuthSlice } from './authStore';
import type { AuthSlice } from './authStore';
import { createTaskSlice } from './taskStore';
import type { TaskSlice } from './taskStore';
import { createUISlice } from './uiStore';
import type { UISlice } from './uiStore';
import { createAnalyticsSlice } from './analyticsStore';
import type { AnalyticsSlice } from './analyticsStore';
import { createNotificationSlice } from './notificationStore';
import type { NotificationSlice } from './notificationStore';

export type AppState = AuthSlice & TaskSlice & UISlice & AnalyticsSlice & NotificationSlice;

export const useStore = create<AppState>((set, get, ...a) => ({
  ...createAuthSlice(set, get, ...a),
  ...createTaskSlice(set, get, ...a),
  ...createUISlice(set, get, ...a),
  ...createAnalyticsSlice(set, get, ...a),
  ...createNotificationSlice(set, get, ...a),
}));

export type { Task, Habit, TeamMember, Comment } from './taskStore';
export type { NotificationItem } from './notificationStore';
export type { UserProfile } from './authStore';
export type { PomodoroSession } from './analyticsStore';
