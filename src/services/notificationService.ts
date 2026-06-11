import type { NotificationItem } from '../types/notification';

export const notificationService = {
  fetchNotifications(): NotificationItem[] {
    const data = localStorage.getItem('smart_task_notifications');
    return data ? JSON.parse(data) : [];
  },

  saveNotifications(notifs: NotificationItem[]) {
    localStorage.setItem('smart_task_notifications', JSON.stringify(notifs));
  },

  addNotification(notif: Omit<NotificationItem, 'id' | 'time' | 'read'>): NotificationItem {
    const notifications = this.fetchNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `n-${Date.now()}`,
      time: 'Just now',
      read: false
    };
    this.saveNotifications([newNotif, ...notifications]);
    return newNotif;
  },

  markAsRead(id: string): NotificationItem[] {
    const notifications = this.fetchNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.saveNotifications(updated);
    return updated;
  },

  clearAll(): NotificationItem[] {
    this.saveNotifications([]);
    return [];
  }
};
