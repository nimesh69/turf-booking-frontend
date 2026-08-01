import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Icon } from "@/icons/Icon"
import { IconName } from "@/icons/icons"
const sidebarItems: {
  to: string;
  label: string;
  icon: IconName;
}[] = [
  { to: "/owner", label: "Dashboard", icon: "dashboard" },
  { to: "/owner/analytics", label: "Analytics", icon: "analytics" },
  { to: "/owner/venues", label: "My Venues", icon: "stadium" },
  { to: "/owner/bookings", label: "Bookings", icon: "booking" },
  { to: "/owner/finance", label: "Finance", icon: "finance" },
  { to: "/owner/chat", label: "Messages", icon: "messages" },
  { to: "/owner/settings", label: "Settings", icon: "settings" },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
        <div className="p-6">
          <Link
            to="/owner"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <span className="text-3xl">⚽</span>
            <span className="text-xl font-bold text-gray-900">TurfBook</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.[0]?.toUpperCase() || "O"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "Owner"}
              </p>
              <p className="text-xs text-gray-500">Venue Owner</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                pathname === item.to
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon name={item.icon} className="w-8 h-8" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
