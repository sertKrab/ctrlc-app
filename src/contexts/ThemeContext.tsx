import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import baseTheme from '@/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeContextProvider');
  return ctx;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light');

  function toggleMode() {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  const activeTheme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
