import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppSkeleton from '@/components/ui/AppSkeleton';
import { THEME_COLORS } from '@/theme';
import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

interface SparklineProps {
  data: number[];
  color: string;
}

function Sparkline({ data, color }: SparklineProps) {
  const W = 80;
  const H = 40;
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = W / (data.length - 1);
  const points = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${H - ((v - min) / range) * H}`)
    .join(' ');

  return (
    <svg width={W} height={H} style={{ display: 'block' }}>
      <path d={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface AppKpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendLabel?: string;
  icon?: ComponentType<SvgIconProps>;
  sparklineData?: number[];
  loading?: boolean;
}

export default function AppKpiCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  sparklineData,
  loading = false,
}: AppKpiCardProps) {
  if (loading) {
    return (
      <Card sx={{ borderRadius: '12px', boxShadow: '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)' }}>
        <AppSkeleton variant="kpi" />
      </Card>
    );
  }

  const trendUp = trend?.startsWith('+');
  const trendDown = trend?.startsWith('-');
  const trendColor = trendUp ? '#10B981' : trendDown ? '#EF4444' : '#6B7280';
  const sparkColor = trendDown ? '#EF4444' : THEME_COLORS.primary;

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)',
        p: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </Typography>
        {Icon && (
          <Box
            sx={{
              width: 32, height: 32, borderRadius: 1.5,
              backgroundColor: THEME_COLORS.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 18, color: THEME_COLORS.primary }} />
          </Box>
        )}
      </Box>

      <Typography
        sx={{ fontSize: '1.75rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2, mb: 1, fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {trend && (
          <Box>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: trendColor }}>
              {trend}
            </Typography>
            {trendLabel && (
              <Typography sx={{ fontSize: '0.6875rem', color: '#6B7280', mt: 0.25 }}>
                {trendLabel}
              </Typography>
            )}
          </Box>
        )}
        {sparklineData && sparklineData.length >= 2 && (
          <Sparkline data={sparklineData} color={sparkColor} />
        )}
      </Box>
    </Card>
  );
}
