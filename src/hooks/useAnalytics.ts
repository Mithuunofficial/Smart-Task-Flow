import { useStore } from '../store/useStore';

export function useAnalytics() {
  const focusHistory = useStore((state) => state.focusHistory);
  const pomodoroMinutesToday = useStore((state) => state.pomodoroMinutesToday);
  const addFocusSession = useStore((state) => state.addFocusSession);

  return {
    focusHistory,
    pomodoroMinutesToday,
    addFocusSession,
  };
}
