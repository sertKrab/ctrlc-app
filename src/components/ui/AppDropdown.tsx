import { useState, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { ReactNode, ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export interface DropdownItem {
  label: string;
  icon?: ComponentType<SvgIconProps>;
  onClick: () => void;
  divider?: boolean;
  danger?: boolean;
}

interface AppDropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}

export default function AppDropdown({ trigger, items }: AppDropdownProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div
        ref={anchorRef}
        onClick={() => setOpen(true)}
        style={{ display: 'inline-flex', cursor: 'pointer' }}
      >
        {trigger}
      </div>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{ paper: { sx: { minWidth: 180, borderRadius: 2, boxShadow: '0 4px 12px rgba(17,24,39,0.12)' } } }}
      >
        {items.map((item, idx) => [
          item.divider && idx > 0 ? <Divider key={`div-${idx}`} /> : null,
          <MenuItem
            key={item.label}
            onClick={() => { item.onClick(); handleClose(); }}
            sx={{
              fontSize: '0.875rem',
              color: item.danger ? 'error.main' : 'inherit',
              '&:hover': { backgroundColor: item.danger ? '#FDECEC' : undefined },
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ color: item.danger ? 'error.main' : 'inherit', minWidth: 32 }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} />
          </MenuItem>,
        ])}
      </Menu>
    </>
  );
}
