import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../test-utils/render';
import { createApiFailure, createApiSuccess, mockLoginResponse } from '../test-utils/fixtures';
import LoginPage from '../../src/pages/LoginPage';

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

function renderLoginPage() {
  return renderWithProviders(<LoginPage />);
}

describe('LoginPage — integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockPost.mockResolvedValue(createApiFailure());
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
    const { user } = renderLoginPage();
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });
    await user.click(submitBtn);
    expect(await screen.findByText('กรุณากรอกอีเมล')).toBeInTheDocument();
    expect(screen.getByText('กรุณากรอกรหัสผ่าน')).toBeInTheDocument();
  });

  it('shows AppAlert error when axios rejects (bad credentials)', async () => {
    mockPost.mockRejectedValueOnce(new Error('Unauthorized'));

    const { user } = renderLoginPage();

    const emailInput = screen.getByPlaceholderText('กรอกอีเมลของคุณ');
    const passwordInput = screen.getByPlaceholderText('กรอกรหัสผ่าน');
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });

    await user.type(emailInput, 'error@test.com');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('login.error.invalid')).toBeInTheDocument();
    });
  });

  it('navigates to /dashboard on successful login', async () => {
    mockPost.mockResolvedValueOnce(createApiSuccess(mockLoginResponse));

    const { user } = renderLoginPage();

    const emailInput = screen.getByPlaceholderText('กรอกอีเมลของคุณ');
    const passwordInput = screen.getByPlaceholderText('กรอกรหัสผ่าน');
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });

    await user.type(emailInput, 'admin@ctrlc.co.th');
    await user.type(passwordInput, 'secret123');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('does not navigate if no credentials are entered', async () => {
    const { user } = renderLoginPage();
    const submitBtn = screen.getByRole('button', { name: /login\.button\.login/i });
    await user.click(submitBtn);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
