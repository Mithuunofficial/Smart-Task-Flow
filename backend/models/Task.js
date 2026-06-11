const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  category: { type: String, enum: ['Design', 'Product', 'Development', 'Admin', 'Marketing'], default: 'Design' },
  dueDate: { type: String, required: true },
  aiScore: { type: Number, default: 0 },
  urgency: { type: String, enum: ['Immediate', 'Moderate', 'Low'], default: 'Low' },
  deadlineAnalysis: { type: String, default: '' },
  suggestedAction: { type: String, default: '' },
  timeEstimate: { type: String, default: '2h' },
  assigneeId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
