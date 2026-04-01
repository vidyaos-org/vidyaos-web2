import { useAuthStore } from '@/lib/store/auth.store';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);
  const logout = useAuthStore((s) => s.logout);
  const updateExamPreferences = useAuthStore((s) => s.updateExamPreferences);
  const addXP = useAuthStore((s) => s.addXP);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    updateExamPreferences,
    addXP,
  };
}
