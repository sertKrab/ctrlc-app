import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { ReactNode, MouseEvent } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ComponentType } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ComponentType<SvgIconProps>;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const MUI_VARIANT = {
  primary: 'contained',
  secondary: 'contained',
  ghost: 'text',
  danger: 'contained',
} as const;

const MUI_COLOR = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'inherit',
  danger: 'error',
} as const;

const SIZE_MAP = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
} as const;

export default function AppButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
}: AppButtonProps) {
  return (
    <Button
      variant={MUI_VARIANT[variant]}
      color={MUI_COLOR[variant]}
      size={SIZE_MAP[size]}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : Icon ? (
          <Icon fontSize="small" />
        ) : undefined
      }
    >
      {children}
    </Button>
  );
}
