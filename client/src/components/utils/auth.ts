// src/utils/auth.ts

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const saveRole = (role: string) => {
  localStorage.setItem('role', role);
};

export const getRole = (): string | null => {
  return localStorage.getItem('role');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
