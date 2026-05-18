export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const truncate = (s: string, n: number) => s.length > n ? s.slice(0, n) + '…' : s;
export const generateId = () => Math.random().toString(36).substring(2, 11);
