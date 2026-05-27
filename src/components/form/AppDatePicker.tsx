import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';

interface AppDatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
}

function toBuddhistEra(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return '';
  const beYear = parseInt(year, 10) + 543;
  return `${day}/${month}/${beYear}`;
}

export default function AppDatePicker({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  minDate,
  maxDate,
}: AppDatePickerProps) {
  const beDisplay = value ? `(พ.ศ. ${toBuddhistEra(value)})` : '';

  return (
    <TextField
      fullWidth
      variant="outlined"
      type="date"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText ?? (beDisplay || undefined)}
      required={required}
      disabled={disabled}
      inputProps={{ min: minDate, max: maxDate }}
      InputLabelProps={{ shrink: true }}
    />
  );
}
