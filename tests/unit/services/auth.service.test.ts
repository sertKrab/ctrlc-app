import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { createApiFailure, createApiSuccess, mockLoginResponse } from '../../test-utils/fixtures';

vi.mock('../../../src/services/http', () => ({
  default: {
    get: vi.fn(),
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

import http from '../../../src/services/http';
import { authService } from '../../../src/services/auth.service';

const mockPost = http.post as Mock;

describe('AuthService.login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns LoginResponse on valid credentials', async () => {
    mockPost.mockResolvedValueOnce(createApiSuccess(mockLoginResponse));

    const result = await authService.login({ username: 'admin@ctrlc.co.th', password: 'secret' });

    expect(result.success).toBe(true);
    expect(result.data.user.email).toBe('admin@ctrlc.co.th');
    expect(result.data.tokens.accessToken).toBe('access-token-abc');
  });

  it('returns ApiResponse with success=false for invalid credentials', async () => {
    mockPost.mockResolvedValueOnce(createApiFailure('AUTH-001'));

    const result = await authService.login({ username: 'error@test.com', password: 'wrong' });

    expect(result.success).toBe(false);
    expect(result.error).toBe('AUTH-001');
  });

  it('throws on network error', async () => {
    mockPost.mockRejectedValueOnce(new Error('Network Error'));

    await expect(
      authService.login({ username: 'admin@ctrlc.co.th', password: 'secret' }),
    ).rejects.toThrow('Network Error');
  });

  it('calls the login endpoint with provided credentials', async () => {
    mockPost.mockResolvedValueOnce(createApiSuccess(mockLoginResponse));

    await authService.login({ username: 'admin@ctrlc.co.th', password: 'mypass' });

    expect(mockPost).toHaveBeenCalledWith(
      expect.stringContaining('/auth'),
      { username: 'admin@ctrlc.co.th', password: 'mypass' },
    );
  });
});

describe('AuthService.logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls logout endpoint and returns success', async () => {
    mockPost.mockResolvedValueOnce({ data: { success: true, data: null } });

    const result = await authService.logout();

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledTimes(1);
  });

  it('throws on network error during logout', async () => {
    mockPost.mockRejectedValueOnce(new Error('SERVER_ERROR'));

    await expect(authService.logout()).rejects.toThrow('SERVER_ERROR');
  });
});
