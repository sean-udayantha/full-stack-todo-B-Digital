import { Avatar, Stack, Typography } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';

export function Logo() {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Avatar variant="rounded" sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}><CheckRounded /></Avatar>
      <Typography component="span" variant="h2" sx={{ fontSize: '1.85rem', fontWeight: 700 }}>Todolist.</Typography>
    </Stack>
  );
}
