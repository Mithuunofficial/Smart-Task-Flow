const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pomodoroMinutesToday: { type: Number, default: 0 },
  focusHistory: [
    {
      duration: { type: Number, required: true },
      category: { type: String, required: true },
      date: { type: String, required: true }
    }
  ],
  efficiencyHistory: [
    {
      date: { type: String, required: true },
      score: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
