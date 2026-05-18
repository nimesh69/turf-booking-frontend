// PublicRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function PublicRoute() {
  return <Outlet />; // ✅ no redirect — let pages handle their own auth
}