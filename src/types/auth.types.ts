export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'player' | 'owner' | 'admin';
  createdAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  first_name: string;
  last_name: string;
  username: string;
  avatar?: string;
  email: string;
  password1: string;
  password2: string;
  phone?: string;
  role: 'player' | 'owner';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
