import type { StateCreator } from 'zustand';
import { supabase } from '../lib/supabaseClient';

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

export interface TaskSlice {
  tasks: Task[];
  habits: Habit[];
  teamMembers: TeamMember[];
  comments: Comment[];
  
  loadTasksFromSupabase: (userId: string) => Promise<void>;
  loadTeamMembersFromSupabase: (userId: string) => Promise<void>;
  loadAnnouncementsFromSupabase: () => Promise<void>;

  addTask: (task: Omit<Task, 'id' | 'aiScore' | 'urgency' | 'deadlineAnalysis' | 'suggestedAction'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, newStatus: Task['status']) => Promise<void>;

  addHabit: (name: string, frequency: string) => void;
  toggleHabit: (id: string, date: string) => void;
  deleteHabit: (id: string) => void;

  addComment: (taskId: string, text: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
}

const calculateAIScore = (priority: Task['priority'], dueDateStr: string): { aiScore: number; urgency: Task['urgency']; deadlineAnalysis: string; suggestedAction: string } => {
  const diffDays = Math.ceil((new Date(dueDateStr).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  let base = priority === 'High' ? 65 : priority === 'Medium' ? 40 : 15;
  
  if (diffDays <= 0) base += 35;
  else if (diffDays === 1) base += 30;
  else if (diffDays === 2) base += 20;
  else if (diffDays <= 5) base += 10;
  
  const score = Math.max(0, Math.min(99, base));
  
  let urgency: Task['urgency'] = 'Low';
  if (score >= 80) urgency = 'Immediate';
  else if (score >= 50) urgency = 'Moderate';

  let deadlineAnalysis = '';
  let suggestedAction = '';

  if (diffDays <= 0) {
    deadlineAnalysis = 'Overdue. Crucial bottleneck risk.';
    suggestedAction = 'Execute immediately. Reschedule secondary tasks.';
  } else if (diffDays === 1) {
    deadlineAnalysis = 'Due tomorrow. Urgent attention required.';
    suggestedAction = 'Dedicate the next Pomodoro block to this task.';
  } else if (diffDays <= 3) {
    deadlineAnalysis = 'Approaching fast. 2-3 days remaining.';
    suggestedAction = 'Start draft and outline key dependencies.';
  } else {
    deadlineAnalysis = `Due in ${diffDays} days. Under control.`;
    suggestedAction = 'Review goals and integrate into mid-week plans.';
  }

  return { aiScore: score, urgency, deadlineAnalysis, suggestedAction };
};

export const createTaskSlice: StateCreator<any, [], [], TaskSlice> = (set, get) => ({
  tasks: [],
  habits: [],
  teamMembers: [],
  comments: [],

  loadTasksFromSupabase: async (userId) => {
    try {
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) console.warn('Error fetching tasks:', error.message);
      if (tasksData) {
        const formattedTasks: Task[] = tasksData.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description || '',
          status: t.status,
          priority: t.priority,
          category: t.category,
          dueDate: t.due_date,
          aiScore: t.ai_score || 0,
          urgency: t.urgency || 'Low',
          deadlineAnalysis: t.deadline_analysis || '',
          suggestedAction: t.suggested_action || '',
          timeEstimate: t.time_estimate || '2h'
        }));
        set({ tasks: formattedTasks });
      }
    } catch (err: any) {
      console.error('taskStore: Error loading tasks:', err);
    }
  },

  loadTeamMembersFromSupabase: async (userId) => {
    try {
      const { data: teamData, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      if (error) console.warn('Error fetching team members:', error.message);
      if (teamData) {
        const formattedTeam: TeamMember[] = teamData.map(m => ({
          id: m.id,
          name: m.name,
          role: m.role || '',
          email: m.email,
          avatar: m.avatar || '',
          status: m.status,
          recentActivity: m.recent_activity || ''
        }));
        set({ teamMembers: formattedTeam });
      }
    } catch (err: any) {
      console.error('taskStore: Error loading team members:', err);
    }
  },

  loadAnnouncementsFromSupabase: async () => {
    try {
      const { data: announcementsData, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.warn('Error fetching announcements:', error.message);
      if (announcementsData) {
        const announcementNotifications = announcementsData.map((a: any) => ({
          id: a.id,
          title: `Announcement: ${a.title}`,
          message: a.message,
          type: 'ai',
          time: new Date(a.created_at).toLocaleDateString(),
          read: false
        }));

        set((state: any) => {
          const otherNotifs = state.notifications.filter((n: any) => !n.title.startsWith('Announcement:'));
          return {
            notifications: [...announcementNotifications, ...otherNotifs]
          };
        });
      }
    } catch (err: any) {
      console.error('taskStore: Error loading announcements:', err);
    }
  },

  addTask: async (task) => {
    const session = (await supabase.auth.getSession()).data.session;
    const userId = session?.user?.id;
    if (!userId) return;

    const id = `t-${Date.now()}`;
    const aiDetails = calculateAIScore(task.priority, task.dueDate);
    const newTask: Task = {
      ...task,
      id,
      ...aiDetails
    };

    set((state: any) => ({
      tasks: [newTask, ...state.tasks]
    }));

    const { data, error } = await supabase.from('tasks').insert({
      user_id: userId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      category: task.category,
      due_date: task.dueDate,
      ai_score: aiDetails.aiScore,
      urgency: aiDetails.urgency,
      deadline_analysis: aiDetails.deadlineAnalysis,
      suggested_action: aiDetails.suggestedAction,
      time_estimate: task.timeEstimate
    }).select();

    if (error) {
      console.error('Error adding task in Supabase:', error);
    } else if (data && data[0]) {
      set((state: any) => ({
        tasks: state.tasks.map((t: Task) => t.id === id ? { ...t, id: data[0].id } : t)
      }));
    }
  },

  updateTask: async (id, updates) => {
    let aiDetails = {};
    set((state: any) => {
      const updatedTasks = state.tasks.map((task: Task) => {
        if (task.id === id) {
          const merged = { ...task, ...updates };
          if (updates.priority || updates.dueDate) {
            aiDetails = calculateAIScore(merged.priority, merged.dueDate);
            return { ...merged, ...aiDetails };
          }
          return merged;
        }
        return task;
      });
      return { tasks: updatedTasks };
    });

    const taskToUpdate = get().tasks.find((t: Task) => t.id === id);
    if (!taskToUpdate) return;

    const { error } = await supabase.from('tasks').update({
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      status: taskToUpdate.status,
      priority: taskToUpdate.priority,
      category: taskToUpdate.category,
      due_date: taskToUpdate.dueDate,
      ai_score: taskToUpdate.aiScore,
      urgency: taskToUpdate.urgency,
      deadline_analysis: taskToUpdate.deadlineAnalysis,
      suggested_action: taskToUpdate.suggestedAction,
      time_estimate: taskToUpdate.timeEstimate
    }).eq('id', id);

    if (error) {
      console.error('Error updating task in Supabase:', error);
    }
  },

  deleteTask: async (id) => {
    set((state: any) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== id)
    }));

    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      console.error('Error deleting task in Supabase:', error);
    }
  },

  moveTask: async (id, newStatus) => {
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    }));

    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    if (error) {
      console.error('Error moving task in Supabase:', error);
    }
  },

  addHabit: (name, frequency) => {
    const newHabit: Habit = {
      id: `h-${Date.now()}`,
      name,
      streak: 0,
      frequency,
      history: {},
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state: any) => ({
      habits: [...state.habits, newHabit]
    }));
  },

  toggleHabit: (id, date) => set((state: any) => {
    const updatedHabits = state.habits.map((habit: Habit) => {
      if (habit.id === id) {
        const history = { ...habit.history };
        const currentlyDone = history[date] || false;
        history[date] = !currentlyDone;

        let streak = habit.streak;
        if (!currentlyDone) {
          streak += 1;
        } else {
          streak = Math.max(0, streak - 1);
        }

        return { ...habit, history, streak };
      }
      return habit;
    });
    return { habits: updatedHabits };
  }),

  deleteHabit: (id) => set((state: any) => ({
    habits: state.habits.filter((habit: Habit) => habit.id !== id)
  })),

  addComment: (taskId, text) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      taskId,
      userName: get().user.name,
      userAvatar: get().user.avatar,
      text,
      timestamp: 'Just now'
    };
    set((state: any) => ({
      comments: [...state.comments, newComment]
    }));
  },

  addTeamMember: async (member) => {
    const session = (await supabase.auth.getSession()).data.session;
    const userId = session?.user?.id;
    if (!userId) return;

    const id = `m-${Date.now()}`;
    const newMember: TeamMember = {
      ...member,
      id
    };

    set((state: any) => ({
      teamMembers: [...state.teamMembers, newMember]
    }));

    const { data, error } = await supabase.from('team_members').insert({
      user_id: userId,
      name: member.name,
      email: member.email,
      role: member.role,
      avatar: member.avatar,
      status: member.status,
      recent_activity: member.recentActivity
    }).select();

    if (error) {
      console.error('Error adding team member in Supabase:', error);
    } else if (data && data[0]) {
      set((state: any) => ({
        teamMembers: state.teamMembers.map((m: TeamMember) => m.id === id ? { ...m, id: data[0].id } : m)
      }));
    }
  }
});
