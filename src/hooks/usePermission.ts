import { useAuth } from '@/hooks/useAuth';
import { hasPermission } from '@/utils/permission';
import type { PermissionAction } from '@/utils/permission';
import type { UserRole } from '@/types/user';

export interface UsePermissionReturn {
  can: (action: PermissionAction) => boolean;
  role: UserRole | null;
}

export function usePermission(): UsePermissionReturn {
  const { user } = useAuth();

  function can(action: PermissionAction): boolean {
    if (!user) return false;
    return hasPermission(user.role, action);
  }

  return { can, role: user?.role ?? null };
}
