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

// Owner pages
import OwnerAnalytics from '@/features/owner/pages/Analytics';
import OwnerBookings from '@/features/owner/pages/Bookings';
import OwnerChat from '@/features/owner/pages/Chat';
import OwnerFinance from '@/features/owner/pages/Finance';
import OwnerMyVenues from '@/features/owner/pages/MyVenues';
import OwnerSettings from '@/features/owner/pages/Settings';
import TurfList from '@/features/owner/pages/turflist';
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

      {/* Owner dashboard - only accessible by owners */}
      <Route element={<OwnerRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/owner" element={<OwnerDashboardPage />} />
          <Route path="/owner/analytics" element={<OwnerAnalytics />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
          <Route path="/owner/chat" element={<OwnerChat />} />
          <Route path="/owner/finance" element={<OwnerFinance />} />
          <Route path="/owner/venues" element={<OwnerMyVenues />} />
          <Route path="/owner/turfs/:venueId" element={<TurfList />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
