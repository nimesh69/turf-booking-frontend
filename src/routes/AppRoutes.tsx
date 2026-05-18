import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import OwnerRoute from './OwnerRoute';

import LoginPage from '@/features/auth/pages/LoginPage';
import SignupPage from '@/features/auth/pages/SignupPage';
import WelcomePlayerPage from '@/features/auth/pages/WelcomePlayerPage';
import WelcomeOwnerPage from '@/features/auth/pages/WelcomeOwnerPage';

import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import TurfDetailsPage from '@/pages/TurfDetailsPage';
import BookingPage from '@/pages/BookingPage';
import MessagesPage from '@/pages/MessagesPage';
import ProfilePage from '@/pages/ProfilePage';
import PlayerProfilePage from '@/pages/PlayerProfilePage';
import OwnerDashboardPage from '@/pages/OwnerDashboardPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes (redirect if logged in) */}
      <Route element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>

      {/* Welcome routes (after login/signup, before main app) */}
        <Route element={<PublicRoute />}>
          <Route path="/welcome-player" element={<WelcomePlayerPage />} />
          <Route path="/welcome-owner" element={<WelcomeOwnerPage />} />
        </Route>
      {/* </Route> */}

      {/* Public main routes */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/turf/:id" element={<TurfDetailsPage />} />
        <Route path="/player/:id" element={<PlayerProfilePage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/booking/:turfId" element={<BookingPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Owner dashboard */}
      <Route element={<OwnerRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/owner" element={<OwnerDashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
