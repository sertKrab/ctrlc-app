import type { UserRole } from '@/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// NOTE: field names here (firstName/lastName, not username/displayName) are
// a convention choice, not a fixed backend contract — confirm against the
// actual API contract / generated backend User model before relying on this
// shape. A frontend/backend mismatch here fails silently at compile time
// (no shared source of truth) and crashes at runtime on first real login.
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
}
