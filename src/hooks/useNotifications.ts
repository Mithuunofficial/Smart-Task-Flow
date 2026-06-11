import { useStore } from '../store/useStore';

export function useNotifications() {
  const notifications = useStore((state) => state.notifications);
  const markNotificationAsRead = useStore((state) => state.markNotificationAsRead);
  const clearNotifications = useStore((state) => state.clearNotifications);
  const addNotification = useStore((state) => state.addNotification);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markNotificationAsRead,
    clearNotifications,
    addNotification,
  };
}
