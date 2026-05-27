import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppDropdown from '@/components/ui/AppDropdown';
import type { DropdownItem } from '@/components/ui/AppDropdown';
import type { ReactNode } from 'react';

export interface ColumnDef<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: unknown, row: T) => ReactNode;
}

interface AppTableRowProps<T extends Record<string, unknown>> {
  row: T;
  columns: ColumnDef<T>[];
  index: number;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  actions?: DropdownItem[];
}

export default function AppTableRow<T extends Record<string, unknown>>({
  row,
  columns,
  index,
  checkable = false,
  checked = false,
  onCheck,
  actions,
}: AppTableRowProps<T>) {
  const isEven = index % 2 === 1;

  return (
    <TableRow
      sx={{
        backgroundColor: isEven ? '#FAFBFC' : '#fff',
        '&:hover': { backgroundColor: '#F0F6FF' },
      }}
    >
      {checkable && (
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            checked={checked}
            onChange={(e) => onCheck?.(e.target.checked)}
          />
        </TableCell>
      )}

      {columns.map((col) => (
        <TableCell
          key={col.key}
          sx={{ width: col.width, fontSize: '0.8125rem', color: '#1A1A2E' }}
        >
          {col.render
            ? col.render(row[col.key], row)
            : String(row[col.key] ?? '')}
        </TableCell>
      ))}

      {actions && actions.length > 0 && (
        <TableCell align="right" sx={{ width: 48, p: 1 }}>
          <AppDropdown
            trigger={
              <IconButton size="small" sx={{ color: '#6B7280' }}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            }
            items={actions}
          />
        </TableCell>
      )}
    </TableRow>
  );
}
