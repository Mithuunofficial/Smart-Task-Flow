const Task = require('../models/Task');
const { calculateAIScore } = require('../services/aiEngine');

const optimizePriorities = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id, status: { $ne: 'Completed' } });
    
    const optimized = [];
    for (let task of tasks) {
      const aiDetails = calculateAIScore(task.priority, task.dueDate);
      const updatedTask = await Task.findByIdAndUpdate(task._id, aiDetails, { new: true });
      optimized.push(updatedTask);
    }
    
    res.json({ message: 'Priorities re-optimized', tasks: optimized });
  } catch (error) {
    next(error);
  }
};

module.exports = { optimizePriorities };
