import { http, HttpResponse } from 'msw';
import type { LoginRequest, LoginResponse, User } from '@/types/auth';
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
  http.get(`${BASE}/auth/profile`, ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth) {
      return HttpResponse.json(
        { success: false, data: null, error: 'Unauthorized', timestamp: timestamp() },
        { status: 401 },
      );
    }
    const { id, email, firstName, lastName, role } = mockUsers[0];
    const response: ApiResponse<User> = {
      success: true,
      data: { id, email, firstName, lastName, role },
      timestamp: timestamp(),
    };
    return HttpResponse.json(response);
  }),

  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (body.email === 'error@test.com') {
      const errorResponse: ApiResponse<null> = {
        success: false,
        data: null as unknown as never,
        error: 'Invalid email or password',
        timestamp: timestamp(),
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const user = mockUsers.find((u) => u.email === body.email) ?? mockUsers[0];

    const loginResponse: LoginResponse = {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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
