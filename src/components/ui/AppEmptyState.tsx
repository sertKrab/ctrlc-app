import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { useTranslation } from 'react-i18next';
import AppButton from './AppButton';

interface AppEmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AppEmptyState({ title, description, action }: AppEmptyStateProps) {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        py: 8, px: 4, textAlign: 'center',
      }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 56, color: '#D1D5DB', mb: 2 }} />
      <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A2E', mb: 0.75 }}>
        {title ?? t('empty.noData')}
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', color: '#6B7280', maxWidth: 360, mb: action ? 3 : 0 }}>
        {description ?? t('empty.noResults')}
      </Typography>
      {action && (
        <AppButton variant="primary" onClick={action.onClick}>
          {action.label}
        </AppButton>
      )}
    </Box>
  );
}
