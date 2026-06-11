if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
  window.location.replace('/#/admin');
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { useStore } from './store/useStore'

// Initialize Supabase Auth session listener
useStore.getState().initializeAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
