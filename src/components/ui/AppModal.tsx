import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';
import type { DialogProps } from '@mui/material/Dialog';

type ModalMaxWidth = 'xs' | 'sm' | 'md';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: ModalMaxWidth;
  loading?: boolean;
}

export default function AppModal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  loading = false,
}: AppModalProps) {
  const handleClose: DialogProps['onClose'] = (_event, reason) => {
    if (reason === 'backdropClick' && loading) return;
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth>
      {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
      <DialogTitle
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontWeight: 600, fontSize: '1rem', pr: 1.5,
        }}
      >
        {title}
        <IconButton size="small" onClick={onClose} disabled={loading}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
