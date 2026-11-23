import { Chip } from '@mui/material';

export function Badge({ done }: { done: boolean }) {
  return (
  <Chip size="small" variant="outlined" color={done ? 'success' : 'default'} label={done ? 'Completed' : 'In progress'} />
    );
}