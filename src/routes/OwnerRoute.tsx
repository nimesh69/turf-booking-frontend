import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function OwnerRoute() {
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    console.log("🔒 OwnerRoute: Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // Check if user is an owner
  if (user?.role !== 'owner') {
    console.log("🔒 OwnerRoute: User is not an owner (role:", user?.role, "), redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  console.log("✅ OwnerRoute: User is authenticated owner, allowing access");
  return <Outlet />;
}
