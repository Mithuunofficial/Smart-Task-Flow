const express = require('express');
const { getAnalytics, logFocusSession } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAnalytics);
router.post('/focus', logFocusSession);

module.exports = router;
