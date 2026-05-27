# Architecture

## Folder Structure

```
src/
├── components/
│   ├── data/        # AppTable, AppPagination, AppTabs, AppKpiCard, AppTableRow
│   ├── form/        # AppTextField, AppSelect, AppDatePicker, AppCheckbox, AppRadioGroup
│   ├── layout/      # AppShell, AppSidebar, AppTopBar, AppLayout, AuthLayout
│   └── ui/          # AppButton, AppCard, AppBadge, AppAlert, AppModal, AppEmptyState,
│                    #   AppSkeleton, AppDropdown
├── constants/       # api, routes, pagination, status
├── contexts/        # AuthContext (auth state + login/logout methods)
├── hooks/           # useAuth, useForm, useTable, usePermission
├── i18n/            # i18next init
├── locales/
│   ├── th/          # Thai translations (auth.json, common.json, navigation.json)
│   └── en/          # English translations
├── mocks/
│   ├── browser.ts   # MSW service worker setup
│   ├── data/        # Mock data fixtures
│   └── handlers/    # MSW request handlers
├── pages/           # LoginPage, DashboardPage, DataTablePage, FormPage,
│                    #   SettingsPage, ReportPage
├── router/          # createBrowserRouter config
├── services/        # http.ts (axios instance), base.service.ts, auth.service.ts
├── store/           # Redux store, auth.slice
├── theme/           # MUI theme config
├── types/           # auth.ts, common.ts, user.ts
└── utils/           # format.ts, validation.ts, storage.ts, permission.ts
```

## Layer Responsibilities

| Layer | Responsibility |
|---|---|
| **pages/** | Compose UI from components, wire hooks, dispatch Redux actions |
| **components/** | Reusable, stateless-friendly UI primitives |
| **hooks/** | Encapsulate state logic (`useTable`, `useForm`) or context access |
| **services/** | HTTP calls via `BaseService`; return typed `ApiResponse<T>` |
| **store/** | Redux Toolkit slices for cross-page state (currently: auth) |
| **contexts/** | React Context for auth state shared across the component tree |
| **mocks/** | MSW handlers intercept API calls in dev/test |

## Component Hierarchy

```
App (RouterProvider)
└── AppLayout (auth guard)
    └── AppShell
        ├── AppSidebar (nav links)
        ├── AppTopBar (breadcrumb, avatar)
        └── <Outlet> → Pages
            ├── DashboardPage
            │   └── AppKpiCard, AppTable, recharts
            ├── DataTablePage
            │   └── AppTabs, AppTable, AppModal, AppPagination
            ├── FormPage
            │   └── AppTextField, AppSelect, AppRadioGroup, AppCheckbox, AppModal
            ├── SettingsPage
            │   └── AppTabs, AppTextField, AppSelect, AppCheckbox
            └── ReportPage
                └── AppKpiCard, recharts, AppTable
AuthLayout
└── LoginPage
    └── AppTextField, AppCheckbox, AppButton, AppAlert
```

## State Management

Two complementary mechanisms exist:

**Redux Toolkit** (`src/store/`) — used for auth state that must persist across page navigations and be accessible from thunks:
- `auth.slice.ts`: `user`, `isAuthenticated`, `isLoading`, `error`
- Thunks: `loginAsync`, `logoutAsync`

**AuthContext** (`src/contexts/AuthContext.tsx`) — React Context wrapping `authService` for components that prefer hook-based access via `useAuth()`. Syncs with localStorage token on mount.

## Routing Strategy

- `createBrowserRouter` with two layout routes:
  - `AuthLayout` → `/` (login) — centered form, no sidebar
  - `AppLayout` → `/dashboard`, `/customers`, `/customers/edit/:id`, `/settings`, `/reports` — authenticated, renders AppShell
- `AppLayout` contains an auth guard: unauthenticated users are redirected to `/`
