const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const connectDB = async () => {
  console.log('Database connecting...');
};
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Database connection fallback
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', analyticsRoutes);

// Base Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Smart Task Flow API - Online' });
});

// Error handling fallback
app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
