# API Integration

## BaseService Pattern

All services extend `BaseService` (`src/services/base.service.ts`), which
provides typed HTTP methods named after the HTTP verbs themselves: `get`,
`post`, `put`, `patch`, `delete`.

```ts
class CustomerService extends BaseService {
  constructor() { super(ENDPOINTS.CUSTOMERS.BASE); }

  list(): Promise<ApiResponse<Customer[]>> {
    return this.get<Customer[]>(ENDPOINTS.CUSTOMERS.BASE);
  }

  create(data: CreateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.post<Customer>(ENDPOINTS.CUSTOMERS.BASE, data);
  }

  // GET a single item and DELETE — do NOT name these `get`/`delete`.
  // A subclass method with the same name as a BaseService method always
  // shadows it (JS/TS classes have no overload resolution by signature).
  // `this.get(...)` inside a method named `get` calls ITSELF, not
  // BaseService's HTTP get — infinite recursion, and the request never
  // reaches the network at all. Use a distinct name instead:
  getById(id: string): Promise<ApiResponse<Customer>> {
    return this.get<Customer>(ENDPOINTS.CUSTOMERS.BY_ID(id));
  }

  remove(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.delete<{ message: string }>(ENDPOINTS.CUSTOMERS.BY_ID(id));
  }
}
export const customerService = new CustomerService();
```

If TypeScript reports `TS2416: Property 'x' in type 'Y' is not assignable
to the same property in base type 'BaseService'` on a resource service,
it means a method name collides with `BaseService` — rename it, don't try
to satisfy the override (the signatures are fundamentally incompatible:
`BaseService.get<T>(path: string)` vs. a resource-level `get(id: number)`).

## ApiResponse\<T\> Wrapper

All API responses are typed as:

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}
```

Always check `res.success` before accessing `res.data`:

```ts
const res = await customerService.list();
if (res.success) {
  setRows(res.data);
} else {
  showError(res.error ?? 'Unknown error');
}
```

## Axios Instance (`src/services/http.ts`)

The shared axios instance has two interceptors:

**Request interceptor** — attaches Bearer token from localStorage on every outgoing request:
```ts
config.headers.Authorization = `Bearer ${getItem(TOKEN_KEY)}`;
```

**Response interceptor** — on 401, removes the stored token (forcing re-login on next navigation):
```ts
if (error.response?.status === 401) removeItem(TOKEN_KEY);
return Promise.reject(error);
```

## Mock vs Real API

Controlled by `VITE_ENABLE_MOCK` in `.env`:

```ts
// src/main.tsx
if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}
```

MSW handlers in `src/mocks/handlers/` mirror the real API contract. Switch to real API by setting `VITE_ENABLE_MOCK=false` and providing `VITE_API_URL`.

## Sidebar Navigation (`src/config/nav.ts`)

`AppSidebar.tsx` is a generic renderer — it is never edited per project.
Per-project navigation is data, defined in `src/config/nav.ts` as `NAV_CONFIG`
(main groups) and `NAV_SYSTEM` (settings/system group, always last).

When generating navigation for a project's actual modules:
- Each `NavItem.icon` must be a key from `NAV_ICON_MAP` (`src/config/nav.icons.ts`)
  — pick the closest semantic match, do not import icon components directly.
- Each `NavItem.labelKey` must exist under the `navigation` i18n namespace;
  add matching keys to both `src/locales/th/navigation.json` and
  `src/locales/en/navigation.json`.
- Each `NavItem.path` must be a route from `src/constants/routes.ts`.
- `NavItem.children` supports one level of nesting for submenus; omit for
  flat items.

Because this is a small, type-checked data file (not a component), a bad
value here is caught by `tsc` immediately rather than producing a runtime or
layout bug.

## Adding a New Endpoint

1. Add path constant in `src/constants/api.ts`:
   ```ts
   INVOICES: { BASE: '/invoices', BY_ID: (id: string) => `/invoices/${id}` }
   ```
2. Create `src/services/invoice.service.ts` extending `BaseService`
3. Add a matching MSW handler in `src/mocks/handlers/`
4. Define TypeScript types in `src/types/`
