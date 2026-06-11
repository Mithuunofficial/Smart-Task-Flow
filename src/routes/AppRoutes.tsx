import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Pages
import LandingPage from '../pages/Landing/LandingPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';

import Dashboard from '../pages/Dashboard/Dashboard';
import TasksPage from '../pages/Tasks/TasksPage';
import AIPriorityPage from '../pages/AI/AIPriorityPage';
import SchedulerPage from '../pages/Scheduler/SchedulerPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';
import FocusPage from '../pages/Focus/FocusPage';
import HabitTrackerPage from '../pages/Habits/HabitTrackerPage';
import TeamPage from '../pages/Team/TeamPage';
import NotificationPage from '../pages/Notifications/NotificationPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import SettingsPage from '../pages/Settings/SettingsPage';
import SupportPage from '../pages/Support/SupportPage';
import AboutPage from '../pages/About/AboutPage';

import AdminPage from '../pages/Admin/AdminPage';
import NotFound from '../pages/Errors/NotFound';
import ServerError from '../pages/Errors/ServerError';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Promotional Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes guarded with PublicRoute */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      
      {/* Admin and Server Error pages */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/500" element={<ServerError />} />

      {/* Authenticated Dashboard space */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
      <Route path="/ai-priority" element={<ProtectedRoute><AIPriorityPage /></ProtectedRoute>} />
      <Route path="/scheduler" element={<ProtectedRoute><SchedulerPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/focus" element={<ProtectedRoute><FocusPage /></ProtectedRoute>} />
      <Route path="/habits" element={<ProtectedRoute><HabitTrackerPage /></ProtectedRoute>} />
      <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />

      {/* Fallback 404 handler */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
