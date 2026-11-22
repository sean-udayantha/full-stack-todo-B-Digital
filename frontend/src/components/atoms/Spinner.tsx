import { CircularProgress } from '@mui/material';

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
  <CircularProgress size={18} color="inherit" aria-label={label} />
);
}
