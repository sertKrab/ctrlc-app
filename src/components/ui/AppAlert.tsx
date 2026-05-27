import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import type { AlertColor } from '@mui/material/Alert';

interface AppAlertProps {
  severity: AlertColor;
  title?: string;
  message: string;
  onClose?: () => void;
}

export default function AppAlert({ severity, title, message, onClose }: AppAlertProps) {
  return (
    <Alert severity={severity} onClose={onClose} sx={{ borderRadius: 2 }}>
      {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}
