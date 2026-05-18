import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import authApi from "@/api/auth.api";
// import { useAuthContext } from "@/context/AuthContext
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import ForgotPasswordModal from "../components/forgotPassword";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login({ username, password });
      // Set user in context
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone,
        avatar: response.user.avatar,
        role: response.user.role,
        createdAt: response.user.createdAt,
      };
      setUser(userData);
      const destination =
        response.user.role === "client"
          ? "/welcome-player"
          : response.user.role === "owner"
            ? "/welcome-owner"
            : "/";
      // Navigate based on role
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Login failed";
      setError(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
  };

  const inputClass =
    "w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300 text-gray-900";

  const iconClass =
    "material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
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
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-3.5 text-sm font-semibold text-center text-blue-600 border-b-2 border-blue-600 bg-white">
              Login
            </button>
            <Link
              to="/signup"
              className="flex-1 py-3.5 text-sm font-semibold text-center text-gray-400 border-b-2 border-transparent hover:text-gray-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <div className="p-6 space-y-4">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900">Welcome Back</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your details to manage your venues.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                {error}
              </div>
            )}

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[.98] transition-all"
            >
              <img
                alt="Google"
                className="w-4 h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS5o9YIVGy9_WfR_NB1jXDRfoF_2BvUC40Yb0SWZXHJ62yDkeXaiLg61Jdx6z1RpG5mje9DKPpsA90nmRZ-4qcZLh2HCnhyavOEnN0UZV9jgWeU6M81hzl2XNkp5iM4JCD-NN3TC0hUMR_Ec-VT0NuaU7rzHVhyCFtNHSPhtXFOrjnNOXRphX6uyxNoaiUdrWwBvkEVWc8Q3uLMvrOOM3ndrm564lyJTLaTkhhoR-w7y3MHv6_iP0CW7_1YUV-fRGuVxbFIJRgznw"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-3 text-[11px] text-gray-400 uppercase tracking-widest">
                or email
              </span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username */}
              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-600"
                >
                  Username
                </label>
                <div className="relative">
                  <span className={iconClass}>person</span>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Cr7"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-gray-600"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className={iconClass}>lock</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-9`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-1"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    refresh
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Terms */}
            <p className="text-center text-xs text-gray-500 leading-relaxed">
              By continuing, you agree to VenueMaster's{" "}
              <Link
                to="/terms"
                className="text-blue-600 font-medium hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-600 font-medium hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        show={showPopup}
        email={email}
        setEmail={setEmail}
        onClose={() => setShowPopup(false)}
        onSend={() => {
          console.log(email);
          setShowPopup(false);
        }}
      />

      {/* Background image */}
      <div className="hidden lg:block fixed right-0 top-0 w-1/3 h-full z-[-1] opacity-10">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLUiHvqIkMmKkykrvJhHxD48qyVScWVzwKP5uU-AoKA9ehyXuoWgW6PQTNEBIiayRj5vRIsRMudAF89EPuCzU6VMbNmR-8fJ3IilrKE5XerxMxjn0ZGsfJneib-DCqgPrcKbq_MLeOmmnT_8l3uHPLo_E1nkxMcZ6_4FlLEC6C6uFDrrB_tJQkaffr61GsdUDjZMDZ6BybICxv93KAI60bT8G1ZaUCw7glFgVrZBXlll6zvt00FxQ6-d7gS2N41xPlNRhF1vzo6Ek"
          alt="Stadium background"
        />
      </div>
    </div>
  );
}
