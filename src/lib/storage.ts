export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  },
  set: <T>(key: string, value: T) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
