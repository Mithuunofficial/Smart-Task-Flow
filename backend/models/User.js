const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, default: 'Team Member' },
  theme: { type: String, default: 'dark' },
  notificationsEnabled: { type: Boolean, default: true },
  marketingEmails: { type: Boolean, default: false },
  language: { type: String, default: 'English' },
  timezone: { type: String, default: 'UTC-5 (EST)' },
  efficiencyIndex: { type: Number, default: 90 },
  focusScore: { type: Number, default: 85 },
  completionRate: { type: Number, default: 80 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
