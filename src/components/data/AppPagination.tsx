import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { THEME_COLORS } from '@/theme';

interface AppPaginationProps {
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  sizeOptions?: number[];
}

export default function AppPagination({
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  sizeOptions = [10, 20, 50, 100],
}: AppPaginationProps) {
  const { t } = useTranslation('common');
  const totalPages = Math.ceil(total / size);
  const start = Math.min((page - 1) * size + 1, total);
  const end = Math.min(page * size, total);

  function handleSizeChange(e: SelectChangeEvent<number>) {
    onSizeChange(Number(e.target.value));
    onPageChange(1);
  }

  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 2, px: 2, py: 1.5,
        borderTop: '1px solid #E5E7EB',
      }}
    >
      <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280' }}>
        {total > 0
          ? `${t('pagination.rowsPerPage')} ${start}–${end} ${t('pagination.of')} ${total.toLocaleString()} ${t('pagination.items')}`
          : t('empty.noData')}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280', whiteSpace: 'nowrap' }}>
            {t('pagination.rowsPerPage')}:
          </Typography>
          <Select
            value={size}
            onChange={handleSizeChange}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.8125rem', '& .MuiSelect-select': { py: '4px', pr: '24px !important' } }}
          >
            {sizeOptions.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: '0.8125rem' }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(_e, p) => onPageChange(p)}
          size="small"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': { fontSize: '0.8125rem' },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: THEME_COLORS.primary, color: '#fff',
              '&:hover': { backgroundColor: '#0A6BDB' },
            },
          }}
        />
      </Box>
    </Box>
  );
}
