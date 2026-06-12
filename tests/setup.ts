import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import { createTheme } from '@mui/material/styles';

const testTheme = createTheme({
  palette: {
    primary: {
      main: '#0D7FFF',
      light: '#E6F1FF',
      dark: '#0A6BDB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2B3D5E',
      light: '#3D5278',
      dark: '#1B2740',
      contrastText: '#FFFFFF',
    },
  },
});

vi.mock('@/theme', () => ({
  default: testTheme,
  THEME_COLORS: {
    primary: '#0D7FFF',
    secondary: '#2B3D5E',
    primaryLight: '#E6F1FF',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: vi.fn(), language: 'th' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

beforeEach(() => {
  localStorage.clear();
});
