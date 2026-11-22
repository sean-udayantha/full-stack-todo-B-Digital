import { Chip, Stack, Tab, Tabs } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilter } from '../../features/ui/uiSlice';
import type { TodoFilter } from '../../types/todo';

export function FilterTabs({ counts }: { counts: Record<TodoFilter, number | undefined> }) {
  const filter = useAppSelector((state) => (state as { ui: { filter: TodoFilter } }).ui.filter);
  const dispatch = useAppDispatch();
  const options: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <Tabs value={filter} onChange={(_event, value: TodoFilter) => dispatch(setFilter(value))} aria-label="Filter tasks" variant="scrollable" scrollButtons="auto">
      {options.map(({ value, label }) => (
        <Tab key={value} value={value} sx={{ minWidth: 0, px: { xs: 1, sm: 2 } }} label={
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <span>{label}</span><Chip size="small" label={counts[value] ?? '—'} />
          </Stack>
        } />
      ))}
    </Tabs>
  );
}
