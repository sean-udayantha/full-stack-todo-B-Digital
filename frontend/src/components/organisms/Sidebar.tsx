import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LayersOutlined from '@mui/icons-material/LayersOutlined';
import FormatListBulletedRounded from '@mui/icons-material/FormatListBulletedRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilter } from '../../features/ui/uiSlice';
import type { TodoFilter } from '../../types/todo';
import { Logo } from '../atoms/Logo';

export function Sidebar({ counts }: { counts: Record<TodoFilter, number | undefined> }) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.ui.filter);
  const links = [
    { value: 'all' as const, label: 'All tasks', icon: LayersOutlined },
    { value: 'active' as const, label: 'Active', icon: FormatListBulletedRounded },
    { value: 'completed' as const, label: 'Completed', icon: CheckCircleOutlineRounded },
  ];

  return (
    <Box component="aside" sx={{ width: { xs: '100%', md: 250 }, flexShrink: 0, bgcolor: 'primary.dark', color: 'primary.contrastText', p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', position: { md: 'sticky' }, top: 0, height: { md: '100dvh' }, overflowY: 'auto' }}>
      <Logo />
      <Typography variant="overline" sx={{ display: { xs: 'none', md: 'block' }, color: 'primary.light', mb: 1 }}>
        Workspace
        </Typography>
      <Box component="nav" aria-label="Task views" sx={{ mt: { xs: 2, md: 0 } }}>
        <List disablePadding sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 0.5 }}>
          {links.map(({ value, label, icon: Icon }) => (
            <ListItemButton
              component="button" key={value} selected={filter === value}
              aria-current={filter === value ? 'page' : undefined} onClick={() => dispatch(setFilter(value))}
              sx={{ borderRadius: 1, gap: 1, minWidth: 0, flex: { xs: 1, md: 'initial' }, px: { xs: 0.75, sm: 1.5 }, py: 1.5, color: 'inherit', '&.Mui-selected': { bgcolor: 'primary.main' }, '&.Mui-selected:hover': { bgcolor: 'primary.main' } }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: 'inherit', display: { xs: 'none', sm: 'flex' } }}>
                <Icon fontSize="small" />
                </ListItemIcon>
              <ListItemText primary={label} slotProps={{ primary: { variant: 'body2', noWrap: true } }} />
              <Typography variant="caption" sx={{ color: 'primary.light' }}>
                {counts[value] ?? '—'}
                </Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
