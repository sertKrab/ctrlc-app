# Testing

## Running Tests

```bash
npm test          # run all tests once (CI mode)
npm run test:watch  # watch mode (re-run on file change)
npm run test:ui   # Vitest browser UI at http://localhost:51204
```

## Test Structure

```
tests/
├── setup.ts                        # global setup: jest-dom, i18n mock, localStorage reset
├── test-utils/
│   ├── fixtures.ts                 # shared mock users, tokens, API response builders
│   ├── render.tsx                  # renderWithProviders + RTL re-exports
│   └── store.ts                    # createTestStore for Redux-backed tests
├── unit/
│   ├── utils/
│   │   ├── format.test.ts          # formatDate, formatCurrency, formatPhone
│   │   └── validation.test.ts      # validateEmail, validateThaiID, validatePhone, validateRequired
│   ├── hooks/
│   │   └── useTable.test.ts        # useTable state + handlers
│   └── services/
│       └── auth.service.test.ts    # AuthService.login / logout (axios mocked)
└── integration/
    └── auth.test.tsx               # LoginPage render + submit flows (all providers)
```

## Adding a Unit Test

Create a file in `tests/unit/<category>/my-util.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { myUtil } from '../../../src/utils/my-util';

describe('myUtil', () => {
  it('does the thing', () => {
    expect(myUtil('input')).toBe('expected');
  });
});
```

## Adding an Integration Test

Create a `.tsx` file in `tests/integration/`. Use the project test renderer so each test gets the same Redux, router, theme, auth, and user-event setup:

```tsx
import { screen, renderWithProviders } from '../test-utils/render';
import MyPage from '../../src/pages/MyPage';

it('renders the page title', () => {
  renderWithProviders(<MyPage />, { route: '/my-page' });
  expect(screen.getByRole('heading', { name: /my title/i })).toBeInTheDocument();
});
```

`renderWithProviders` returns the Testing Library render result plus:

```ts
const { store, user } = renderWithProviders(<MyPage />);

await user.click(screen.getByRole('button', { name: /save/i }));
expect(store.getState().auth.isAuthenticated).toBe(false);
```

Options:

```ts
renderWithProviders(<MyPage />, {
  route: '/settings',
  preloadedState: {
    auth: {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    },
  },
  withAuthProvider: true,
});
```

Use `withAuthProvider: false` only for tests that need to assert behavior outside `AuthProvider`.

## Mock Patterns

### Mock axios (http module)

```ts
vi.mock('../../src/services/http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    // ...
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
  },
}));

import http from '../../src/services/http';
const mockPost = http.post as Mock;

mockPost.mockResolvedValueOnce({ data: { success: true, data: { ... } } });
```

Prefer shared fixtures for common auth/API data:

```ts
import { createApiSuccess, mockLoginResponse } from '../test-utils/fixtures';

mockPost.mockResolvedValueOnce(createApiSuccess(mockLoginResponse));
```

### Mock i18n (auto-applied via setup.ts)

`useTranslation` is globally mocked in `tests/setup.ts` so `t('some.key')` returns `'some.key'`. Query UI elements by their translation key:

```ts
screen.getByRole('button', { name: /common\.button\.save/i });
```

### Mock localStorage

`localStorage` is a real jsdom implementation. It is cleared in `beforeEach` via `tests/setup.ts`. Access it normally in tests:

```ts
localStorage.setItem('auth_token', 'test-token');
```

### Mock useNavigate

```ts
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});
```
