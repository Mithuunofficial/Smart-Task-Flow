import type { Task } from '../types/task';

export function calculateAIScore(
  priority: Task['priority'],
  dueDateStr: string
): {
  aiScore: number;
  urgency: Task['urgency'];
  deadlineAnalysis: string;
  suggestedAction: string;
} {
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
}
