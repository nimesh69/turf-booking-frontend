import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "@/api/auth.api";
import { useAuthContext } from "@/context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [formData, setFormData] = useState({
    Username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("player");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and privacy policy");
      return;
    }
    setLoading(true);
    try {
      const signupData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.Username,
        email: formData.email,
        phone: formData.phone,
        password1: formData.password1,
        password2: formData.password2,
        role: role as "player" | "owner",
        avatar: undefined,
      };
      
      const response = await authApi.signup(signupData);
      console.log("Signup response:", response);
      
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
      
      // Navigate based on role
      if (response.user.role === "client") {
        navigate("/welcome-player");
      } else if (response.user.role === "owner") {
        navigate("/welcome-owner");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "Signup failed";
      setError(msg);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300 text-gray-900";

  const iconClass =
    "material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-center">
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
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[560px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <Link
              to="/login"
              className="flex-1 py-3.5 text-sm font-semibold text-center text-gray-400 border-b-2 border-transparent hover:text-gray-600 transition-colors"
            >
              Login
            </Link>
            <button className="flex-1 py-3.5 text-sm font-semibold text-center text-blue-600 border-b-2 border-blue-600 bg-white">
              Sign Up
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Join VenueMaster to list and manage your venues.
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
              onClick={() => console.log("Google signup")}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[.98] transition-all"
            >
              <img
                alt="Google"
                className="w-4 h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS5o9YIVGy9_WfR_NB1jXDRfoF_2BvUC40Yb0SWZXHJ62yDkeXaiLg61Jdx6z1RpG5mje9DKPpsA90nmRZ-4qcZLh2HCnhyavOEnN0UZV9jgWeU6M81hzl2XNkp5iM4JCD-NN3TC0hUMR_Ec-VT0NuaU7rzHVhyCFtNHSPhtXFOrjnNOXRphX6uyxNoaiUdrWwBvkEVWc8Q3uLMvrOOM3ndrm564lyJTLaTkhhoR-w7y3MHv6_iP0CW7_1YUV-fRGuVxbFIJRgznw"
              />
              Sign Up with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-3 text-[11px] text-gray-400 uppercase tracking-widest">
                or email
              </span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row 1: Username / First / Last */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Personal info
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="username"
                      className="block text-xs font-semibold text-gray-600"
                    >
                      User Name
                    </label>
                    <div className="relative">
                      <span className={iconClass}>person</span>
                      <input
                        id="username"
                        type="text"
                        name="Username"
                        required
                        value={formData.Username}
                        onChange={handleChange}
                        placeholder="Cr7"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="first_name"
                      className="block text-xs font-semibold text-gray-600"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className={iconClass}>person</span>
                      <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="last_name"
                      className="block text-xs font-semibold text-gray-600"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <span className={iconClass}>person</span>
                      <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Email / Phone */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-600"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className={iconClass}>mail</span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@arena.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-gray-600"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className={iconClass}>phone</span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9186465491"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Passwords */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Security
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="password1"
                      className="block text-xs font-semibold text-gray-600"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className={iconClass}>lock</span>
                      <input
                        id="password1"
                        type={showPassword ? "text" : "password"}
                        name="password1"
                        required
                        value={formData.password1}
                        onChange={handleChange}
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
                  <div className="space-y-1">
                    <label
                      htmlFor="password2"
                      className="block text-xs font-semibold text-gray-600"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className={iconClass}>lock</span>
                      <input
                        id="password2"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password2"
                        required
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`${inputClass} pr-9`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showConfirmPassword
                            ? "visibility_off"
                            : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Role
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    htmlFor="player"
                    className={`flex items-center gap-2.5 h-10 px-3 rounded-lg border cursor-pointer select-none text-sm font-semibold transition-all
                      ${
                        role === "player"
                          ? "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span>🏃</span> Player
                    <input
                      type="radio"
                      name="role"
                      id="player"
                      value="player"
                      checked={role === "player"}
                      onChange={(e) => setRole(e.target.value)}
                      className="ml-auto w-3.5 h-3.5 accent-blue-500"
                    />
                  </label>
                  <label
                    htmlFor="owner"
                    className={`flex items-center gap-2.5 h-10 px-3 rounded-lg border cursor-pointer select-none text-sm font-semibold transition-all
                      ${
                        role === "owner"
                          ? "border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span>🏟️</span> Turf Owner
                    <input
                      type="radio"
                      name="role"
                      id="owner"
                      value="owner"
                      checked={role === "owner"}
                      onChange={(e) => setRole(e.target.value)}
                      className="ml-auto w-3.5 h-3.5 accent-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 cursor-pointer accent-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-500 cursor-pointer leading-relaxed"
                >
                  I agree to VenueMaster's{" "}
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
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    refresh
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

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
