import axiosInstance from './axios';
import type { LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth.types';

const url = "api/auth";

const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await axiosInstance.post(`${url}/login/`, { username, password });
      // console.log('Login response:', data);
      return data;
    } catch (error: unknown) {
      throw error.response?.data || { error: error.message };
    }
  },

  // No refreshToken param needed — cookie sent automatically
  logout: async () => {
    try {
      await axiosInstance.post(`${url}/logout/`);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error.response?.data || { error: error.message };
    }
  },

  signup: async (formData: SignupCredentials): Promise<AuthResponse> => {
    console.log('Signup formData:', formData);
    try {
      const { data } = await axiosInstance.post(`${url}/signup/`, { ...formData });
      return data;
    } catch (error) {
      const errData = error.response?.data;
      console.error('Signup raw error:', JSON.stringify(errData, null, 2));
      throw errData || { error: error.message };
    }
  },

  me: async () => {
    try {
      const { data } = await axiosInstance.get(`${url}/user/me/`); 
      return data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  // No refreshToken param needed — backend reads it from cookie
  // deactivateAccount: async (password) => {
  //   try {
  //     const { data } = await axiosInstance.post('/api/account/deactivate/', { password });
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },

  // // No refreshToken param needed — backend reads it from cookie
  // deleteAccount: async (password) => {
  //   try {
  //     const { data } = await axiosInstance.post('/api/account/delete/', { password });
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },

  // passwordReset: async (email) => {
  //   try {
  //     const { data } = await axiosInstance.post('/api/password-reset/', { email });
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },

  // passwordResetConfirm: async (uidb64, token, formData) => {
  //   try {
  //     const { data } = await axiosInstance.post(
  //       `/api/password-reset-confirm/${uidb64}/${token}/`,
  //       formData
  //     );
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },

  // requestReactivation: async (username) => {
  //   try {
  //     const { data } = await axiosInstance.post('/api/request-reactivation/', { username });
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },

  // reactivateConfirm: async (uidb64, token) => {
  //   try {
  //     const { data } = await axiosInstance.post(`/api/reactivate/${uidb64}/${token}/`);
  //     return data;
  //   } catch (error) {
  //     throw error.response?.data || { error: error.message };
  //   }
  // },
};

export default authApi;