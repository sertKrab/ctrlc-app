import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../src/store/auth.slice';
import { AuthProvider } from '../../src/contexts/AuthContext';
import LoginPage from '../../src/pages/LoginPage';

const testTheme = createTheme({
  palette: {
    primary: { main: '#0D7FFF' },
    secondary: { main: '#2B3D5E' },
  },
});

vi.mock('../../src/services/http', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { success: false, data: null } }),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import http from '../../src/services/http';
const mockPost = http.post as Mock;

const MOCK_USER = {
  id: '1',
  username: 'admin',
  email: 'admin@ctrlc.co.th',
  displayName: 'Admin',
  role: 'admin' as const,
};

const MOCK_TOKENS = {
  accessToken: 'access-abc',
  refreshToken: 'refresh-xyz',
  expiresIn: 3600,
};

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

function renderLoginPage() {
  const testStore = makeStore();
  return render(
    <Provider store={testStore}>
      <ThemeProvider theme={testTheme}>
        <MemoryRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
}

describe('LoginPage — integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockPost.mockResolvedValue({ data: { success: false, data: null } });
  });

  it('renders email and password input fields', async () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('กรอกอีเมลของคุณ')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('กรอกรหัสผ่าน')).toBeInTheDocument();
  });

  it('renders the login button', () => {
    renderLoginPage();
    expect(screen.getByRole('button', { name: /login\.button\.login/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    renderLoginPage();
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });
    await userEvent.click(submitBtn);
    expect(await screen.findByText('กรุณากรอกอีเมล')).toBeInTheDocument();
    expect(screen.getByText('กรุณากรอกรหัสผ่าน')).toBeInTheDocument();
  });

  it('shows AppAlert error when axios rejects (bad credentials)', async () => {
    mockPost.mockRejectedValueOnce(new Error('Unauthorized'));

    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('กรอกอีเมลของคุณ');
    const passwordInput = screen.getByPlaceholderText('กรอกรหัสผ่าน');
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });

    await userEvent.type(emailInput, 'error@test.com');
    await userEvent.type(passwordInput, 'wrongpass');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('login.error.invalid')).toBeInTheDocument();
    });
  });

  it('navigates to /dashboard on successful login', async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        success: true,
        data: { user: MOCK_USER, tokens: MOCK_TOKENS },
      },
    });

    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('กรอกอีเมลของคุณ');
    const passwordInput = screen.getByPlaceholderText('กรอกรหัสผ่าน');
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });

    await userEvent.type(emailInput, 'admin@ctrlc.co.th');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('does not navigate if no credentials are entered', async () => {
    renderLoginPage();
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });
    await userEvent.click(submitBtn);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
