import type { LoginResponse, TokenPair, User } from '@/types/auth';

export const mockUser: User = {
  id: '1',
  email: 'admin@ctrlc.co.th',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
};

export const mockTokens: TokenPair = {
  accessToken: 'access-token-abc',
  refreshToken: 'refresh-token-xyz',
  expiresIn: 3600,
};

export const mockLoginResponse: LoginResponse = {
  user: mockUser,
  tokens: mockTokens,
};

export function createApiSuccess<T>(data: T) {
  return {
    data: {
      success: true,
      data,
    },
  };
}

export function createApiFailure(error = 'AUTH-001') {
  return {
    data: {
      success: false,
      error,
      data: null,
    },
  };
}
