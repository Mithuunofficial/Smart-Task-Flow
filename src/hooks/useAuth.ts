import { useStore } from '../store/useStore';

export function useAuth() {
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const login = useStore((state) => state.login);
  const signUp = useStore((state) => state.signUp);
  const logout = useStore((state) => state.logout);
  const updateProfile = useStore((state) => state.updateProfile);
  const initializeAuth = useStore((state) => state.initializeAuth);

  return {
    user,
    isAuthenticated,
    login,
    signUp,
    logout,
    updateProfile,
    initializeAuth,
  };
}
