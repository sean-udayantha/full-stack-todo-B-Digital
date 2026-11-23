import { Alert, Snackbar } from '@mui/material';
import type { Notice } from '../../types/todo';

export function Toast({ notice, onDismiss }: { notice: Notice | null; onDismiss: () => void }) {
  return (
    <Snackbar
      open={Boolean(notice)} key={notice?.message}
      autoHideDuration={notice?.kind === 'error' ? null : 5000}
      onClose={(_event, reason) => { if (reason !== 'clickaway') onDismiss(); }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={notice?.kind ?? 'success'} role={notice?.kind === 'error' ? 'alert' : 'status'} variant="filled" onClose={onDismiss}>
        {notice?.message}
      </Alert>
    </Snackbar>
  );
}
