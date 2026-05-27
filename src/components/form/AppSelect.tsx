import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { SelectOption } from '@/types/common';

interface AppSelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: SelectChangeEvent<string | number>) => void;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function AppSelect({
  label,
  name,
  value,
  onChange,
  options,
  error = false,
  helperText,
  required = false,
  disabled = false,
}: AppSelectProps) {
  const labelId = `${name}-label`;

  return (
    <FormControl fullWidth variant="outlined" error={error} required={required} disabled={disabled}>
      <InputLabel id={labelId} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        notched
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
