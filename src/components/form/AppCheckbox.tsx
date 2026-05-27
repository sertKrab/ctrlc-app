import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import type { ChangeEvent } from 'react';

interface AppCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function AppCheckbox({
  label,
  name,
  checked,
  onChange,
  error = false,
  helperText,
  disabled = false,
}: AppCheckboxProps) {
  return (
    <FormControl error={error} disabled={disabled}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={checked}
            onChange={onChange}
            size="small"
          />
        }
        label={label}
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
      />
      {helperText && <FormHelperText sx={{ mt: 0 }}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
