import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { NAV_CONFIG, NAV_SYSTEM, type NavItem } from '@/config/nav';
import { NAV_ICON_MAP } from '@/config/nav.icons';
import type { ReactNode } from 'react';
import { THEME_COLORS } from '@/theme';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;
const NAVY = THEME_COLORS.secondary;
const BLUE = THEME_COLORS.primary;

interface AppSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AppSidebar({ mobileOpen, onMobileClose }: AppSidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation('navigation');
  const { logout } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');
  const hasActiveChild = (item: NavItem) => item.children?.some((c) => isActive(c.path)) ?? false;

  function renderTooltip(label: string, children: ReactNode) {
    return (
      <Tooltip title={label} placement="right" arrow disableHoverListener={false}>
        <Box component="span" sx={{ display: 'block' }}>
          {children}
        </Box>
      </Tooltip>
    );
  }

  function renderNavButton(item: NavItem, opts?: { indent?: boolean; expandState?: boolean }) {
    const Icon = NAV_ICON_MAP[item.icon];
    const active = item.children ? hasActiveChild(item) : isActive(item.path);
    const label = t(item.labelKey);
    const hasChildren = !!item.children?.length;

    const handleClick = () => {
      if (hasChildren) {
        setOpenSubmenus((prev) => ({ ...prev, [item.path]: !prev[item.path] }));
        return;
      }
      navigate(item.path);
      onMobileClose();
    };

    return (
      <ListItemButton
        onClick={handleClick}
        sx={{
          mx: 1,
          mb: 0.5,
          pl: opts?.indent ? { xs: 4, md: 1.25, lg: 4 } : { xs: 2, md: 1.25, lg: 2 },
          pr: { xs: 2, md: 1.25, lg: 2 },
          borderRadius: 1,
          color: active ? '#fff' : 'rgba(255,255,255,0.72)',
          backgroundColor: active && !hasChildren ? BLUE : 'transparent',
          borderLeft: active && !hasChildren ? `3px solid #fff` : '3px solid transparent',
          justifyContent: { md: 'center', lg: 'flex-start' },
          '&:hover': {
            backgroundColor: active && !hasChildren ? BLUE : 'rgba(255,255,255,0.08)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: { xs: 36, md: 0, lg: 36 }, color: 'inherit', justifyContent: 'center' }}>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ display: { md: 'none', lg: 'block' } }}
          primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400 }}
        />
        {hasChildren && (
          <Box sx={{ display: { md: 'none', lg: 'block' } }}>
            {opts?.expandState ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </Box>
        )}
      </ListItemButton>
    );
  }

  function renderNavItem(item: NavItem) {
    const label = t(item.labelKey);
    const hasChildren = !!item.children?.length;
    const isOpen = hasChildren && (openSubmenus[item.path] ?? hasActiveChild(item));

    return (
      <Box key={item.path} sx={{ display: 'block' }}>
        <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
          {renderTooltip(label, renderNavButton(item, { expandState: isOpen }))}
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}>
          {renderNavButton(item, { expandState: isOpen })}
        </Box>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children!.map((child) => (
                <Box key={child.path} sx={{ display: 'block' }}>
                  <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
                    {renderTooltip(t(child.labelKey), renderNavButton(child, { indent: true }))}
                  </Box>
                  <Box sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}>
                    {renderNavButton(child, { indent: true })}
                  </Box>
                </Box>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  }

  function renderDrawerContent() {
    return (
      <>
      <Box
        sx={{
          px: { xs: 2.5, md: 1.5, lg: 2.5 },
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: { md: 'center', lg: 'flex-start' },
          gap: 1.5,
        }}
      >
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
        <Box sx={{ display: { md: 'none', lg: 'block' } }}>
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.2 }}>
            {'__APP_TITLE__'}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6875rem', lineHeight: 1.4 }}>
            Enterprise
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2 }} />

      <Box sx={{ flex: 1, pt: 1, overflowY: 'auto' }}>
        {NAV_CONFIG.map((group) => (
          <Box key={group.titleKey}>
            <Typography
              sx={{ px: 2.5, py: 1, fontSize: '0.6875rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase',
                display: { md: 'none', lg: 'block' } }}
            >
              {t(group.titleKey)}
            </Typography>
            <List disablePadding>
              {group.items.map(renderNavItem)}
            </List>
          </Box>
        ))}

        <Typography
          sx={{ px: 2.5, pt: 2, pb: 1, fontSize: '0.6875rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase',
            display: { md: 'none', lg: 'block' } }}
        >
          {t(NAV_SYSTEM.titleKey)}
        </Typography>
        <List disablePadding>
          {NAV_SYSTEM.items.map(renderNavItem)}
        </List>
      </Box>

      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', pt: 1, pb: 1.5 }}>
        <ListItemButton
          onClick={() => void logout()}
          sx={{
            mx: 1, borderRadius: 1,
            color: 'rgba(255,255,255,0.72)',
            px: { xs: 2, md: 1.25, lg: 2 },
            justifyContent: { md: 'center', lg: 'flex-start' },
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: { xs: 36, md: 0, lg: 36 }, color: 'inherit', justifyContent: 'center' }}>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('topbar.logout')}
            sx={{ display: { md: 'none', lg: 'block' } }}
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />
        </ListItemButton>
      </Box>
      </>
    );
  }

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
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
        {renderDrawerContent()}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: SIDEBAR_COLLAPSED_WIDTH, lg: SIDEBAR_WIDTH },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { md: SIDEBAR_COLLAPSED_WIDTH, lg: SIDEBAR_WIDTH },
            boxSizing: 'border-box',
            backgroundColor: NAVY,
            borderRight: 'none',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  );
}
