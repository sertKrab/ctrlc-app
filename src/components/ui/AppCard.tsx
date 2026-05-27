import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

interface AppCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  noPadding?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppCard({ title, subtitle, children, action, noPadding = false, sx }: AppCardProps) {
  return (
    <Card sx={{ borderRadius: '12px', boxShadow: '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)', ...( typeof sx === 'object' && !Array.isArray(sx) ? sx : {}) }}>
      {(title || action) && (
        <Box
          sx={{
            px: 3, pt: 2.5, pb: title ? 1.5 : 2,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2,
          }}
        >
          {title && (
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 600, fontSize: '1rem', color: '#1A1A2E' }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography sx={{ fontSize: '0.8125rem', color: '#6B7280', mt: 0.25 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Box>
      )}
      {noPadding ? children : <CardContent sx={{ pt: title ? 0 : 2.5 }}>{children}</CardContent>}
    </Card>
  );
}
