import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { THEME_COLORS } from '@/theme';

const BREADCRUMB_MAP: Record<string, string[]> = {
  [ROUTES.DASHBOARD]: ['menu.dashboard'],
  [ROUTES.SETTINGS]: ['menu.settings'],
};

interface AppTopBarProps {
  onMenuClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function AppTopBar({ onMenuClick }: AppTopBarProps) {
  const { pathname } = useLocation();
  const { t } = useTranslation('navigation');
  const { user } = useAuth();

  const crumbKey = Object.keys(BREADCRUMB_MAP).find(
    (k) => pathname === k || pathname.startsWith(k + '/'),
  );
  const crumbs = crumbKey ? BREADCRUMB_MAP[crumbKey] : ['system.loading'];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #E5E7EB',
        height: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', gap: 2 }}>
        <IconButton
          edge="start"
          size="small"
          aria-label="Open navigation"
          onClick={onMenuClick}
          sx={{ color: '#1A1A2E', display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuOutlinedIcon fontSize="small" />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0 }}>
          {crumbs.map((crumb, i) => (
            <Box key={crumb} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
              {i > 0 && (
                <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem' }}>/</Typography>
              )}
              <Typography
                noWrap
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: i === crumbs.length - 1 ? 600 : 400,
                  color: i === crumbs.length - 1 ? '#1A1A2E' : '#6B7280',
                }}
              >
                {t(crumb)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: '#6B7280', display: { xs: 'none', sm: 'inline-flex' } }}>
            <SearchOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ color: '#6B7280' }}>
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
              <NotificationsOutlinedIcon fontSize="small" />
            </Badge>
          </IconButton>

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0.5, sm: 1 } }}>
              <Avatar
                sx={{
                  width: 32, height: 32,
                  backgroundColor: THEME_COLORS.primary,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {getInitials(`${user.firstName} ${user.lastName}`)}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1A1A2E', lineHeight: 1.3 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: '#6B7280', lineHeight: 1.3 }}>
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
