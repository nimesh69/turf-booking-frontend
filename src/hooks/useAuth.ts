import { useAuthContext } from '@/context/AuthContext';
import authApi from '@/api/auth.api';
import { setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/lib/token';
import type { LoginCredentials, SignupCredentials } from '@/types/auth.types';

export const useAuth = () => {
  const { user, setUser, isAuthenticated } = useAuthContext();

  const login = async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials.username, credentials.password);
    setUser(response.user);
    return response;
  };

  const signup = async (credentials: SignupCredentials) => {
    const response = await authApi.signup(credentials);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    try { await authApi.logout(); } catch {}
    // setUser(null);
  };

  return { user, isAuthenticated, login, signup, logout };
};
