import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import type { ChangeEvent, ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

interface AppTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  startIcon?: ComponentType<SvgIconProps>;
  placeholder?: string;
}

export default function AppTextField({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  multiline = false,
  rows,
  type = 'text',
  startIcon: StartIcon,
  placeholder,
}: AppTextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      type={type}
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
      InputProps={
        StartIcon
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <StartIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}
