import type { UserRole } from '@/types/user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
}
