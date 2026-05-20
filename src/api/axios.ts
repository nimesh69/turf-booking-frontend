import axios from "axios";
// import.meta.env
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // already had this ✅
});

// ─── Request interceptor ───────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    // CSRF token (Django sets csrftoken cookie, readable by JS)
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    // Keep your FormData logging if needed
    // let dataToLog = config.data;
    // if (config.data instanceof FormData) { ... }

    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  },
);

// ─── Response interceptor ──────────────────────────────────────────────────
interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(),
  );
  failedQueue = [];
};

const AUTH_SKIP_URLS = [
  "/api/auth/login/",
  "/api/auth/signup/",
  "/api/auth/refresh/",
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? "";

    // ✅ Skip interceptor for auth endpoints
    if (AUTH_SKIP_URLS.some((url) => requestUrl.includes(url))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest)); // 
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/api/auth/refresh/"); 
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
