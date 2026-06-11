export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'deadline' | 'ai' | 'activity';
  time: string;
  read: boolean;
}
