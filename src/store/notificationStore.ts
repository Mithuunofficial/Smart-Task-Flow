import type { StateCreator } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'deadline' | 'ai' | 'activity';
  time: string;
  read: boolean;
}

export interface NotificationSlice {
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
}

export const createNotificationSlice: StateCreator<any, [], [], NotificationSlice> = (set) => ({
  notifications: [],

  markNotificationAsRead: (id) => set((state: any) => ({
    notifications: state.notifications.map((notif: NotificationItem) => 
      notif.id === id ? { ...notif, read: true } : notif
    )
  })),

  clearNotifications: () => set({ notifications: [] }),

  addNotification: (notification) => {
    const newNotif: NotificationItem = {
      ...notification,
      id: `n-${Date.now()}`,
      time: 'Just now',
      read: false
    };
    set((state: any) => ({
      notifications: [newNotif, ...state.notifications]
    }));
  }
});
