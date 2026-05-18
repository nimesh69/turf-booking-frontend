import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export default function WelcomePlayerPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleExplore = () => {
    navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span
            className="material-symbols-outlined text-blue-600 text-3xl"
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
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-5xl">
                person
              </span>
            </div>

            {/* Welcome Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name || "Player"}! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You're all set to book your favorite turfs and play amazing matches!
            </p>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900 font-semibold">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Role:</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  <span>🏃</span> {user?.role}
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
                onClick={handleExplore}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 active:scale-[.98] transition-all shadow-md"
              >
                <span className="material-symbols-outlined inline-block mr-2 text-[20px]">
                  explore
                </span>
                Explore Turfs
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
                icon: "search",
                title: "Find Turfs",
                description: "Discover amazing turfs near you",
              },
              {
                icon: "calendar_today",
                title: "Book Matches",
                description: "Reserve slots for your games",
              },
              {
                icon: "star",
                title: "Leave Reviews",
                description: "Share your experience",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <span
                  className="material-symbols-outlined text-3xl text-blue-600 block mb-2"
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
        </div>
      </main>
    </div>
  );
}
