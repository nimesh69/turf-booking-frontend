import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, SignupCredentials, User } from '@/types/auth.types';
import  authApi  from '../../api/auth.api';
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/lib/token';

const initialState: AuthState = {
  user: null, token: null, isAuthenticated: false, isLoading: false, error: null,
};

export const loginThunk = createAsyncThunk('auth/login', async (creds: LoginCredentials) => {
  const { data } = await authApi.login(creds);
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  return data;
});

export const signupThunk = createAsyncThunk('auth/signup', async (creds: SignupCredentials) => {
  const { data } = await authApi.signup(creds);
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  return data;
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try { await authApi.logout(); } catch {}
  removeToken(); removeRefreshToken();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => { state.user = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, s => { s.isLoading = true; s.error = null; })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.isLoading = false; s.user = a.payload.user;
        s.token = a.payload.accessToken; s.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.isLoading = false; s.error = a.error.message || 'Login failed';
      })
      .addCase(signupThunk.pending, s => { s.isLoading = true; s.error = null; })
      .addCase(signupThunk.fulfilled, (s, a) => {
        s.isLoading = false; s.user = a.payload.user;
        s.token = a.payload.accessToken; s.isAuthenticated = true;
      })
      .addCase(signupThunk.rejected, (s, a) => {
        s.isLoading = false; s.error = a.error.message || 'Signup failed';
      })
      .addCase(logoutThunk.fulfilled, s => {
        s.user = null; s.token = null; s.isAuthenticated = false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
