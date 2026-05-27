export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/customers',
  CUSTOMERS_EDIT: '/customers/edit',
  SETTINGS: '/settings',
  REPORT: '/report',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
