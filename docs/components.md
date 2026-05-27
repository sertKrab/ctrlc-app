# Component Reference

## Layout Components (`src/components/layout/`)

| Component | Key Props | Usage |
|---|---|---|
| `AppShell` | `children` | Outer shell combining sidebar + topbar + content area |
| `AppSidebar` | — | Navy 240 px sidebar; reads route for active link highlight |
| `AppTopBar` | — | Top bar with breadcrumb (from route), search, avatar menu |
| `AppLayout` | — | Auth guard wrapper; redirects to `/` if not authenticated |
| `AuthLayout` | — | Centered `<Outlet>` for unauthenticated routes (login) |

## UI Components (`src/components/ui/`)

| Component | Key Props | Usage |
|---|---|---|
| `AppButton` | `variant` (`primary`\|`ghost`\|`danger`\|`text`), `size` (`sm`\|`md`\|`lg`), `loading`, `fullWidth`, `onClick`, `type` | Primary action buttons across the app |
| `AppCard` | `title?`, `subtitle?`, `action?`, `noPadding?`, `sx?` | Content container with optional header |
| `AppBadge` | `status` (`active`\|`inactive`\|`pending`\|`approved`\|`rejected`\|`error`) | Colored status pill |
| `AppAlert` | `severity` (`error`\|`warning`\|`info`\|`success`), `message`, `onClose?` | Dismissible inline alert |
| `AppModal` | `open`, `onClose`, `title`, `children`, `actions?`, `maxWidth?` | Centered dialog overlay |
| `AppEmptyState` | `title`, `description?`, `icon?`, `action?` | Empty list/table placeholder |
| `AppSkeleton` | `variant` (`text`\|`rect`\|`circle`), `width?`, `height?`, `lines?` | Loading placeholder |
| `AppDropdown` | `trigger`, `items` (`{label, onClick, danger?}[]`) | Contextual action menu |

### AppButton examples

```tsx
<AppButton variant="primary" onClick={save}>บันทึก</AppButton>
<AppButton variant="ghost" size="sm">ยกเลิก</AppButton>
<AppButton variant="danger" loading={deleting}>ลบ</AppButton>
```

## Form Components (`src/components/form/`)

| Component | Key Props | Usage |
|---|---|---|
| `AppTextField` | `label`, `name`, `value`, `onChange`, `error?`, `helperText?`, `type?`, `placeholder?`, `disabled?`, `required?` | Single-line text input |
| `AppSelect` | `label`, `name`, `value`, `onChange`, `options` (`SelectOption[]`) | Dropdown select |
| `AppDatePicker` | `label`, `name`, `value`, `onChange`, `error?`, `helperText?` | Date picker with Buddhist Era display (+543) |
| `AppCheckbox` | `label`, `name`, `checked`, `onChange`, `disabled?` | Labeled checkbox |
| `AppRadioGroup` | `label`, `name`, `value`, `onChange`, `options` (`SelectOption[]`), `row?` | Radio button group |

### AppTextField example

```tsx
<AppTextField
  label="อีเมล"
  name="email"
  value={form.email}
  onChange={handleChange}
  error={!!errors.email}
  helperText={errors.email}
  type="email"
/>
```

### AppSelect example

```tsx
<AppSelect
  label="สถานะ"
  name="status"
  value={status}
  onChange={(e) => setStatus(String(e.target.value))}
  options={[
    { value: 'active', label: 'ใช้งาน' },
    { value: 'inactive', label: 'ไม่ใช้งาน' },
  ]}
/>
```

## Data Components (`src/components/data/`)

| Component | Key Props | Usage |
|---|---|---|
| `AppTable<T>` | `columns` (`ColumnDef<T>[]`), `rows`, `idKey`, `checkable?`, `selectedIds?`, `onSelectionChange?`, `onSort?`, `emptyTitle?` | Generic sortable/checkable data table |
| `AppTableRow` | Used internally by `AppTable` | Single table row with optional checkbox and actions |
| `AppPagination` | `page`, `size`, `total`, `onPageChange`, `onSizeChange` | Page navigation with size selector |
| `AppTabs` | `tabs` (`{label, value}[]`), `value`, `onChange` | Horizontal tab bar |
| `AppKpiCard` | `title`, `value`, `trend?`, `trendLabel?`, `sparklineData?` | KPI metric card with inline SVG sparkline |

### AppTable example

```tsx
interface Row extends Record<string, unknown> {
  id: string; name: string; status: string;
}
const columns: ColumnDef<Row>[] = [
  { key: 'name', label: 'ชื่อ', sortable: true },
  { key: 'status', label: 'สถานะ', render: (v) => <AppBadge status={v as StatusType} /> },
];
<AppTable<Row>
  columns={columns}
  rows={data}
  idKey="id"
  checkable
  selectedIds={selected}
  onSelectionChange={setSelected}
/>
```
