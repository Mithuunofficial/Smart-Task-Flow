const Analytics = require('../models/Analytics');

const getAnalytics = async (req, res, next) => {
  try {
    let analytics = await Analytics.findOne({ userId: req.user.id });
    if (!analytics) {
      analytics = await Analytics.create({
        userId: req.user.id,
        pomodoroMinutesToday: 0,
        focusHistory: [],
        efficiencyHistory: []
      });
    }
    res.json(analytics);
  } catch (error) {
    next(error);
  }
};

const logFocusSession = async (req, res, next) => {
  try {
    const { duration, category } = req.body;
    const date = new Date().toISOString().split('T')[0];
    
    let analytics = await Analytics.findOne({ userId: req.user.id });
    if (!analytics) {
      analytics = new Analytics({ userId: req.user.id, pomodoroMinutesToday: 0, focusHistory: [] });
    }
    
    analytics.focusHistory.unshift({ duration, category, date });
    analytics.pomodoroMinutesToday += duration;
    
    await analytics.save();
    res.status(201).json(analytics);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics, logFocusSession };
