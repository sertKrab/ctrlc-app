import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppSkeleton from '@/components/ui/AppSkeleton';
import AppEmptyState from '@/components/ui/AppEmptyState';
import AppTableRow from './AppTableRow';
import type { ColumnDef } from './AppTableRow';
import type { DropdownItem } from '@/components/ui/AppDropdown';
import type { SortOrder } from '@/types/common';

interface AppTableProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  rows: T[];
  loading?: boolean;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortOrder?: SortOrder;
  checkable?: boolean;
  selectedIds?: string[];
  onSelectChange?: (ids: string[]) => void;
  idKey?: keyof T;
  emptyTitle?: string;
  emptyDescription?: string;
  rowActions?: (row: T) => DropdownItem[];
}

export default function AppTable<T extends Record<string, unknown>>({
  columns,
  rows,
  loading = false,
  onSort,
  sortKey,
  sortOrder = 'asc',
  checkable = false,
  selectedIds = [],
  onSelectChange,
  idKey = 'id',
  emptyTitle,
  emptyDescription,
  rowActions,
}: AppTableProps<T>) {
  const allChecked = rows.length > 0 && rows.every((r) => selectedIds.includes(String(r[idKey])));
  const someChecked = rows.some((r) => selectedIds.includes(String(r[idKey]))) && !allChecked;

  function handleSelectAll(checked: boolean) {
    if (!onSelectChange) return;
    onSelectChange(checked ? rows.map((r) => String(r[idKey])) : []);
  }

  function handleSelectOne(rowId: string, checked: boolean) {
    if (!onSelectChange) return;
    onSelectChange(
      checked ? [...selectedIds, rowId] : selectedIds.filter((id) => id !== rowId),
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <AppSkeleton variant="table" />
      </Box>
    );
  }

  if (rows.length === 0) {
    return <AppEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const hasActions = !!rowActions;

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {checkable && (
              <TableCell padding="checkbox" sx={{ backgroundColor: '#F9FAFB' }}>
                <Checkbox
                  size="small"
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  backgroundColor: '#F9FAFB',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: '#6B7280',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  width: col.width,
                }}
              >
                {col.sortable && onSort ? (
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortOrder : 'asc'}
                    onClick={() => onSort(col.key)}
                    sx={{ color: '#6B7280 !important', '& .MuiTableSortLabel-icon': { color: '#6B7280 !important' } }}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell sx={{ backgroundColor: '#F9FAFB', width: 48 }} />
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <AppTableRow
              key={String(row[idKey]) || idx}
              row={row}
              columns={columns}
              index={idx}
              checkable={checkable}
              checked={selectedIds.includes(String(row[idKey]))}
              onCheck={(checked) => handleSelectOne(String(row[idKey]), checked)}
              actions={rowActions ? rowActions(row) : undefined}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
