import { BaseService } from './base.service';
import { ENDPOINTS } from '@/constants/api';
import type { LoginRequest, LoginResponse, User } from '@/types/auth';
import type { ApiResponse } from '@/types/common';

class AuthService extends BaseService {
  constructor() {
    super(ENDPOINTS.AUTH.LOGIN);
  }

  login(req: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, req);
  }

  logout(): Promise<ApiResponse<void>> {
    return this.post<void>(ENDPOINTS.AUTH.LOGOUT);
  }

  refreshToken(refreshToken: string): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken });
  }

  getProfile(): Promise<ApiResponse<User>> {
    return this.get<User>(ENDPOINTS.AUTH.PROFILE);
  }
}

export const authService = new AuthService();
