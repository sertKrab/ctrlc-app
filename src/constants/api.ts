export const API_BASE_URL: string = import.meta.env.VITE_API_URL as string ?? '';

export const API_TIMEOUT = 10000;

export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
  CUSTOMERS: {
    BASE: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
  },
  REPORTS: {
    BASE: '/reports',
  },
  SETTINGS: {
    BASE: '/settings',
  },
} as const;
