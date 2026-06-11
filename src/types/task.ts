export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  category: 'Design' | 'Product' | 'Development' | 'Admin' | 'Marketing';
  dueDate: string;
  aiScore: number;
  urgency: 'Immediate' | 'Moderate' | 'Low';
  deadlineAnalysis: string;
  suggestedAction: string;
  assigneeId?: string;
  timeEstimate?: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  frequency: string;
  history: { [date: string]: boolean };
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Away' | 'In Meeting' | 'Offline';
  recentActivity?: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}
