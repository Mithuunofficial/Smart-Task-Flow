import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useTheme() {
  const theme = useStore((state) => state.user.theme);
  const updateProfile = useStore((state) => state.updateProfile);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'amoled', 'light');
    if (theme === 'amoled') {
      root.classList.add('amoled', 'dark'); // amoled overrides dark properties
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'amoled' : theme === 'amoled' ? 'dark' : 'dark';
    updateProfile({ theme: nextTheme });
  };

  return {
    theme,
    toggleTheme,
    setTheme: (newTheme: 'dark' | 'light' | 'amoled') => updateProfile({ theme: newTheme })
  };
}
