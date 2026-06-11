const autoScheduleDay = (tasks, hours) => {
  const pendingTasks = tasks.filter(t => t.status !== 'Completed');
  const highPriority = pendingTasks.filter(t => t.priority === 'High');
  const mediumPriority = pendingTasks.filter(t => t.priority === 'Medium');
  
  let highIndex = 0;
  let mediumIndex = 0;
  
  const schedule = hours.map((hour, idx) => {
    // Skip 12:00 PM (Lunch break)
    if (hour === '12:00 PM') {
      return { time: hour, taskTitle: 'Lunch Break & Recharge', category: 'Admin', priority: 'Low', free: false };
    }
    
    // Fill first two morning slots with sync and highest priority task
    if (idx === 1 && highPriority[highIndex]) {
      const task = highPriority[highIndex++];
      return { time: hour, taskTitle: task.title, category: task.category, priority: task.priority, id: task._id || task.id };
    }
    
    if (idx === 2 && highPriority[highIndex]) {
      const task = highPriority[highIndex++];
      return { time: hour, taskTitle: task.title, category: task.category, priority: task.priority, id: task._id || task.id };
    }
    
    if (idx === 0) {
      return { time: hour, taskTitle: 'Daily Sync & Backlog Review', category: 'Admin', priority: 'Medium' };
    }
    
    // Fill other slots with medium priority or other pending tasks
    if (mediumPriority[mediumIndex]) {
      const task = mediumPriority[mediumIndex++];
      return { time: hour, taskTitle: task.title, category: task.category, priority: task.priority, id: task._id || task.id };
    }
    
    return { time: hour, free: true };
  });
  
  return schedule;
};

module.exports = { autoScheduleDay };
