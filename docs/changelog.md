# Changelog

## v1.0.0 — 2025-05-27

Initial template release.

### Added

**Application pages (Phase 4b)**
- `LoginPage` — split-panel layout (Navy left / white right), email + password form, remember me, SSO buttons, TH/EN language toggle, error `AppAlert`
- `DashboardPage` — 3 KPI cards, weekly transactions bar chart (recharts), pending approvals list, recent transactions table with pagination
- `DataTablePage` — filterable tabs, search + branch filter, checkable sortable table, bulk action bar, delete confirmation modal, empty state, pagination
- `FormPage` — sticky 5-section TOC, multi-section form (radio, text, date, select, checkbox), summary card, Maker-Checker consent, success modal
- `SettingsPage` — 3-tab settings (Account / Security / Notifications), 2FA toggle, IP whitelist, connected devices, notification channel checkboxes
- `ReportPage` — date-range selector, compare-period toggle, 4 KPI cards, revenue/cost line chart, monthly bar chart, branch breakdown bars, transaction-type table

**Component library (Phase 4a)**
- Layout: `AppShell`, `AppSidebar`, `AppTopBar`, `AppLayout`, `AuthLayout`
- UI: `AppButton`, `AppCard`, `AppBadge`, `AppAlert`, `AppModal`, `AppEmptyState`, `AppSkeleton`, `AppDropdown`
- Form: `AppTextField`, `AppSelect`, `AppDatePicker`, `AppCheckbox`, `AppRadioGroup`
- Data: `AppTable`, `AppTableRow`, `AppPagination`, `AppTabs`, `AppKpiCard`

**Infrastructure (Phases 1–3)**
- React 18 + TypeScript 5 + Vite 5 project scaffold
- MUI v5 theme with Navy/Electric Blue palette and Sarabun font
- react-router-dom v6 with `createBrowserRouter`, auth guard
- Redux Toolkit store (`auth.slice` with `loginAsync` / `logoutAsync`)
- `AuthContext` + `useAuth` hook
- i18next with static Thai/English translations (3 namespaces)
- MSW v2 mock layer (`VITE_ENABLE_MOCK=true`)
- Custom hooks: `useForm`, `useTable`, `usePermission`
- Utility functions: `formatDate` (Buddhist Era), `formatCurrency`, `formatPhone`, validators

**Tests & Docs (Phase 5)**
- Vitest + Testing Library test suite: 40+ tests across unit and integration
  - `format.test.ts`, `validation.test.ts`, `useTable.test.ts`, `auth.service.test.ts`
  - `auth.test.tsx` integration test for full LoginPage flow
- `docs/` with 8 markdown files: getting-started, architecture, components, i18n, api, testing, deployment, changelog

**Dependencies added**
- `recharts` ^3.x — charts on Dashboard and Report pages
- `vitest`, `@vitest/ui`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` (devDependencies)
