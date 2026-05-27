import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import DataTablePage from '@/pages/DataTablePage';
import FormPage from '@/pages/FormPage';
import SettingsPage from '@/pages/SettingsPage';
import ReportPage from '@/pages/ReportPage';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.CUSTOMERS, element: <DataTablePage /> },
      { path: `${ROUTES.CUSTOMERS_EDIT}/:id`, element: <FormPage /> },
      { path: ROUTES.SETTINGS, element: <SettingsPage /> },
      { path: ROUTES.REPORT, element: <ReportPage /> },
    ],
  },
]);

export default router;
