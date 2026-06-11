import type { Task } from '../types/task';

export const dummyTasks: Task[] = [
  {
    id: 't-1',
    title: 'Migrate state to Zustand slices',
    description: 'Decompose monolithic useStore into modular slices using Zustand Slice Pattern.',
    status: 'In Progress',
    priority: 'High',
    category: 'Development',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    aiScore: 85,
    urgency: 'Immediate',
    deadlineAnalysis: 'Due tomorrow. Urgent attention required.',
    suggestedAction: 'Dedicate the next Pomodoro block to this task.'
  },
  {
    id: 't-2',
    title: 'Design glassmorphic dashboard widgets',
    description: 'Ensure premium dark-mode panels with smooth transitions and Outfit font styling.',
    status: 'Completed',
    priority: 'High',
    category: 'Design',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
    aiScore: 99,
    urgency: 'Immediate',
    deadlineAnalysis: 'Overdue. Crucial bottleneck risk.',
    suggestedAction: 'Execute immediately. Reschedule secondary tasks.'
  },
  {
    id: 't-3',
    title: 'Compile API Documentation',
    description: 'Write Markdown list detailing authentication and tasks REST endpoints.',
    status: 'To Do',
    priority: 'Medium',
    category: 'Product',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], // 4 days out
    aiScore: 50,
    urgency: 'Moderate',
    deadlineAnalysis: 'Due in 4 days. Under control.',
    suggestedAction: 'Review goals and integrate into mid-week plans.'
  }
];
