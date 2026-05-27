import type { UserRole } from '@/types/user';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete';

export const PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  admin: ['view', 'create', 'edit', 'delete'],
  manager: ['view', 'create', 'edit'],
  user: ['view'],
};

export function hasPermission(role: UserRole, action: PermissionAction): boolean {
  return PERMISSIONS[role]?.includes(action) ?? false;
}
