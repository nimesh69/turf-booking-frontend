import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export default function WelcomeOwnerPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/owner");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span
            className="material-symbols-outlined text-amber-600 text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stadium
          </span>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            VenueMaster
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-5xl">
                storefront
              </span>
            </div>

            {/* Welcome Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name || "Owner"}! 🏟️
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You're ready to manage your turf and start earning!
            </p>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900 font-semibold">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Role:</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                  <span>🏟️</span> Turf Owner
                </span>
              </div>
              {user?.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-900 font-semibold">{user.phone}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDashboard}
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 active:scale-[.98] transition-all shadow-md"
              >
                <span className="material-symbols-outlined inline-block mr-2 text-[20px]">
                  dashboard
                </span>
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/messages")}
                className="w-full py-3 px-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-[.98] transition-all"
              >
                <span className="material-symbols-outlined inline-block mr-2 text-[20px]">
                  chat
                </span>
                View Messages
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-full py-3 px-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-[.98] transition-all"
              >
                <span className="material-symbols-outlined inline-block mr-2 text-[20px]">
                  person
                </span>
                My Profile
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "add",
                title: "Add Turf",
                description: "List your venues and prices",
              },
              {
                icon: "event",
                title: "Manage Bookings",
                description: "View and manage reservations",
              },
              {
                icon: "trending_up",
                title: "Analytics",
                description: "Track earnings and bookings",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <span
                  className="material-symbols-outlined text-3xl text-amber-600 block mb-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  {feature.icon}
                </span>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Active Turfs</h3>
                <span className="material-symbols-outlined text-amber-600 text-2xl">
                  storefront
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Go to dashboard to add your first turf
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Total Bookings</h3>
                <span className="material-symbols-outlined text-green-600 text-2xl">
                  calendar_check
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Bookings will appear here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
