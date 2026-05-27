import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, LoginRequest } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/api';
import { setItem, removeItem } from '@/utils/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (req: LoginRequest, { rejectWithValue }) => {
    const res = await authService.login(req);
    if (!res.success) {
      return rejectWithValue(res.error ?? 'Login failed');
    }
    setItem(TOKEN_KEY, res.data.tokens.accessToken);
    setItem(REFRESH_TOKEN_KEY, res.data.tokens.refreshToken);
    return res.data.user;
  },
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch {
      return rejectWithValue('Logout failed');
    } finally {
      removeItem(TOKEN_KEY);
      removeItem(REFRESH_TOKEN_KEY);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
