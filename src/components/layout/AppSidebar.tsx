import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ComponentType } from 'react';
import { THEME_COLORS } from '@/theme';

const SIDEBAR_WIDTH = 240;
const NAVY = THEME_COLORS.secondary;
const BLUE = THEME_COLORS.primary;

interface NavItem {
  path: string;
  labelKey: string;
  Icon: ComponentType<SvgIconProps>;
}

const NAV_ITEMS: NavItem[] = [
  { path: ROUTES.DASHBOARD, labelKey: 'menu.dashboard', Icon: DashboardOutlinedIcon },
  { path: ROUTES.CUSTOMERS, labelKey: 'menu.customers', Icon: PeopleOutlinedIcon },
  { path: ROUTES.REPORT, labelKey: 'menu.report', Icon: AssessmentOutlinedIcon },
];

const NAV_SYSTEM: NavItem[] = [
  { path: ROUTES.SETTINGS, labelKey: 'menu.settings', Icon: SettingsOutlinedIcon },
];

export default function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation('navigation');
  const { logout } = useAuth();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  function renderNavItem(item: NavItem) {
    const active = isActive(item.path);
    return (
      <ListItemButton
        key={item.path}
        onClick={() => navigate(item.path)}
        sx={{
          mx: 1,
          borderRadius: 1,
          color: active ? '#fff' : 'rgba(255,255,255,0.72)',
          backgroundColor: active ? BLUE : 'transparent',
          borderLeft: active ? `3px solid #fff` : '3px solid transparent',
          '&:hover': {
            backgroundColor: active ? BLUE : 'rgba(255,255,255,0.08)',
          },
          mb: 0.5,
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
          <item.Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={t(item.labelKey)}
          primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400 }}
        />
      </ListItemButton>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: NAVY,
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 2.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 1.5,
            backgroundColor: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14, color: BLUE, flexShrink: 0,
          }}
        >
          ^C
        </Box>
        <Box>
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.2 }}>
            {'__APP_TITLE__'}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6875rem', lineHeight: 1.4 }}>
            Enterprise
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2 }} />

      {/* Main nav */}
      <Box sx={{ flex: 1, pt: 1 }}>
        <Typography
          sx={{ px: 2.5, py: 1, fontSize: '0.6875rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          ทั่วไป
        </Typography>
        <List disablePadding>
          {NAV_ITEMS.map(renderNavItem)}
        </List>

        <Typography
          sx={{ px: 2.5, pt: 2, pb: 1, fontSize: '0.6875rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          ระบบ
        </Typography>
        <List disablePadding>
          {NAV_SYSTEM.map(renderNavItem)}
        </List>
      </Box>

      {/* Logout */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', pt: 1, pb: 1.5 }}>
        <ListItemButton
          onClick={() => void logout()}
          sx={{
            mx: 1, borderRadius: 1,
            color: 'rgba(255,255,255,0.72)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('topbar.logout')}
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
