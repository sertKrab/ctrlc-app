import { http, HttpResponse } from 'msw';
import type { LoginRequest, LoginResponse } from '@/types/auth';
import type { ApiResponse } from '@/types/common';
import { mockUsers } from '@/mocks/data/users.data';

const BASE = (import.meta.env.VITE_API_URL as string) ?? '';

function timestamp(): string {
  return new Date().toISOString();
}

function makeTokens() {
  return {
    accessToken: `mock-access-token-${Date.now()}`,
    refreshToken: `mock-refresh-token-${Date.now()}`,
    expiresIn: 3600,
  };
}

export const authHandlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (body.username === 'error@test.com') {
      const errorResponse: ApiResponse<null> = {
        success: false,
        data: null as unknown as never,
        error: 'Invalid username or password',
        timestamp: timestamp(),
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const user = mockUsers.find((u) => u.username === body.username) ?? mockUsers[0];

    const loginResponse: LoginResponse = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
      tokens: makeTokens(),
    };

    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: loginResponse,
      timestamp: timestamp(),
    };

    return HttpResponse.json(response);
  }),

  http.post(`${BASE}/auth/logout`, () => {
    const response: ApiResponse<null> = {
      success: true,
      data: null as unknown as never,
      timestamp: timestamp(),
    };
    return HttpResponse.json(response);
  }),

  http.post(`${BASE}/auth/refresh`, async ({ request }) => {
    const body = (await request.json()) as { refreshToken: string };

    if (!body.refreshToken) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        data: null as unknown as never,
        error: 'Invalid refresh token',
        timestamp: timestamp(),
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const user = mockUsers[0];
    const loginResponse: LoginResponse = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
      tokens: makeTokens(),
    };

    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: loginResponse,
      timestamp: timestamp(),
    };

    return HttpResponse.json(response);
  }),
];
