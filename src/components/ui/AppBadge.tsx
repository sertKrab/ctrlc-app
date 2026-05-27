import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import { THEME_COLORS } from '@/theme';

type BadgeStatus = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'error';

interface AppBadgeProps {
  status: BadgeStatus;
}

const COLOR_MAP: Record<BadgeStatus, { bg: string; color: string }> = {
  active:   { bg: '#E7F8F1', color: '#10B981' },
  approved: { bg: THEME_COLORS.primaryLight, color: THEME_COLORS.primary },
  pending:  { bg: '#FEF3E2', color: '#F59E0B' },
  inactive: { bg: '#F3F4F6', color: '#6B7280' },
  rejected: { bg: '#FDECEC', color: '#EF4444' },
  error:    { bg: '#FDECEC', color: '#EF4444' },
};

const LABEL_KEY: Record<BadgeStatus, string> = {
  active: 'status.active',
  inactive: 'status.inactive',
  pending: 'status.pending',
  approved: 'status.approved',
  rejected: 'status.rejected',
  error: 'status.rejected',
};

export default function AppBadge({ status }: AppBadgeProps) {
  const { t } = useTranslation('common');
  const { bg, color } = COLOR_MAP[status];

  return (
    <Chip
      label={t(LABEL_KEY[status])}
      size="small"
      sx={{
        backgroundColor: bg,
        color,
        fontWeight: 500,
        fontSize: '0.75rem',
        height: 22,
        borderRadius: 9999,
        '& .MuiChip-label': { px: 1.25 },
      }}
    />
  );
}
