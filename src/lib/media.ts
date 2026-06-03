export const getMediaUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith("http")) return path; // already absolute
  const base = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${base}/media/${cleanPath}`;
};
