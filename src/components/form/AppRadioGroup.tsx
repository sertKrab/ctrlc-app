import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import type { ChangeEvent } from 'react';
import type { SelectOption } from '@/types/common';

interface AppRadioGroupProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
  row?: boolean;
}

export default function AppRadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  error = false,
  helperText,
  required = false,
  row = false,
}: AppRadioGroupProps) {
  return (
    <FormControl error={error} required={required}>
      <FormLabel sx={{ fontSize: '0.75rem', fontWeight: 500, mb: 0.5 }}>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} row={row}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio size="small" />}
            label={opt.label}
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
