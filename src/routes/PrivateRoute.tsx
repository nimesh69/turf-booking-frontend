import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  console.log("🔒 PrivateRoute check — isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
