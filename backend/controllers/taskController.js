const Task = require('../models/Task');
const { calculateAIScore } = require('../services/aiEngine');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, category, dueDate, timeEstimate } = req.body;
    const aiDetails = calculateAIScore(priority, dueDate);

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      timeEstimate,
      ...aiDetails
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updates = { ...req.body };

    if (req.body.priority || req.body.dueDate) {
      const current = await Task.findById(id);
      const priority = req.body.priority || current.priority;
      const dueDate = req.body.dueDate || current.dueDate;
      const aiDetails = calculateAIScore(priority, dueDate);
      updates = { ...updates, ...aiDetails };
    }

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
