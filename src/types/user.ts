export type UserRole = 'admin' | 'manager' | 'user';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}
