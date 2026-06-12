import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type TestRootState = ReturnType<typeof rootReducer>;

export function createTestStore(preloadedState?: Partial<TestRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type TestStore = ReturnType<typeof createTestStore>;
export type TestDispatch = TestStore['dispatch'];
