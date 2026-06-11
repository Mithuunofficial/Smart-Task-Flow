import { supabase } from '../lib/supabaseClient';
import type { Task, TeamMember } from '../types/task';

export const taskService = {
  async fetchTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map(t => ({
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
  },

  async createTask(userId: string, task: Omit<Task, 'id'>) {
    return supabase.from('tasks').insert({
      user_id: userId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      category: task.category,
      due_date: task.dueDate,
      ai_score: task.aiScore,
      urgency: task.urgency,
      deadline_analysis: task.deadlineAnalysis,
      suggested_action: task.suggestedAction,
      time_estimate: task.timeEstimate
    }).select();
  },

  async updateTask(id: string, updates: Partial<Task>) {
    const payload: any = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.priority !== undefined) payload.priority = updates.priority;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.dueDate !== undefined) payload.due_date = updates.dueDate;
    if (updates.aiScore !== undefined) payload.ai_score = updates.aiScore;
    if (updates.urgency !== undefined) payload.urgency = updates.urgency;
    if (updates.deadlineAnalysis !== undefined) payload.deadline_analysis = updates.deadlineAnalysis;
    if (updates.suggestedAction !== undefined) payload.suggested_action = updates.suggestedAction;
    if (updates.timeEstimate !== undefined) payload.time_estimate = updates.timeEstimate;

    return supabase.from('tasks').update(payload).eq('id', id);
  },

  async deleteTask(id: string) {
    return supabase.from('tasks').delete().eq('id', id);
  },

  async fetchTeamMembers(userId: string): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error || !data) return [];
    return data.map(m => ({
      id: m.id,
      name: m.name,
      role: m.role || '',
      email: m.email,
      avatar: m.avatar || '',
      status: m.status,
      recentActivity: m.recent_activity || ''
    }));
  },

  async createTeamMember(userId: string, member: Omit<TeamMember, 'id'>) {
    return supabase.from('team_members').insert({
      user_id: userId,
      name: member.name,
      email: member.email,
      role: member.role,
      avatar: member.avatar,
      status: member.status,
      recent_activity: member.recentActivity
    }).select();
  },

  async fetchAnnouncements() {
    return supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
  }
};
