export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password);

export const validatePhone = (phone: string) =>
  /^[+]?[0-9]{10,15}$/.test(phone.replace(/\s/g, ''));
