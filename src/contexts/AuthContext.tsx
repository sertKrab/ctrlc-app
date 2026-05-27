import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginRequest } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/api';
import { getItem, setItem, removeItem } from '@/utils/storage';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (req: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getItem<string>(TOKEN_KEY);
    if (token) {
      authService
        .getProfile()
        .then((res) => {
          if (res.success) setUser(res.data);
        })
        .catch(() => {
          removeItem(TOKEN_KEY);
          removeItem(REFRESH_TOKEN_KEY);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  async function login(req: LoginRequest): Promise<void> {
    const res = await authService.login(req);
    if (res.success) {
      setItem(TOKEN_KEY, res.data.tokens.accessToken);
      setItem(REFRESH_TOKEN_KEY, res.data.tokens.refreshToken);
      setUser(res.data.user);
    }
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout();
    } finally {
      removeItem(TOKEN_KEY);
      removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
