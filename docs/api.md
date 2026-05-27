# API Integration

## BaseService Pattern

All services extend `BaseService` (`src/services/base.service.ts`), which provides typed HTTP methods:

```ts
class CustomerService extends BaseService {
  constructor() { super(ENDPOINTS.CUSTOMERS.BASE); }

  list(): Promise<ApiResponse<Customer[]>> {
    return this.get<Customer[]>(ENDPOINTS.CUSTOMERS.BASE);
  }

  create(data: CreateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.post<Customer>(ENDPOINTS.CUSTOMERS.BASE, data);
  }
}
export const customerService = new CustomerService();
```

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

## Adding a New Endpoint

1. Add path constant in `src/constants/api.ts`:
   ```ts
   INVOICES: { BASE: '/invoices', BY_ID: (id: string) => `/invoices/${id}` }
   ```
2. Create `src/services/invoice.service.ts` extending `BaseService`
3. Add a matching MSW handler in `src/mocks/handlers/`
4. Define TypeScript types in `src/types/`
