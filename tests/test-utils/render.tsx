import type { ReactElement, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { createTestStore } from './store';
import type { TestRootState, TestStore } from './store';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<TestRootState>;
  route?: string;
  store?: TestStore;
  withAuthProvider?: boolean;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    route = '/',
    store = createTestStore(preloadedState),
    withAuthProvider = true,
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    const content = withAuthProvider ? <AuthProvider>{children}</AuthProvider> : children;

    return (
      <ReduxProvider store={store}>
        <ThemeContextProvider>
          <CssBaseline />
          <MemoryRouter initialEntries={[route]}>{content}</MemoryRouter>
        </ThemeContextProvider>
      </ReduxProvider>
    );
  }

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from '@testing-library/react';
export { userEvent };
