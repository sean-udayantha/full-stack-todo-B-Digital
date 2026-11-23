import { Box, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearch, setSort } from '../../features/ui/uiSlice';
import type { TodoFilter, TodoSort } from '../../types/todo';
import { FilterTabs } from '../molecules/FilterTabs';
import { IconButton } from '../atoms/IconButton';

export function TaskToolbar({ counts }: { counts: Record<TodoFilter, number | undefined> }) {
  const { search, sort } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ px: { xs: 1.5, sm: 3 }, borderBottom: 1, borderColor: 'divider' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          type="search" size="small" placeholder="Search your tasks…" value={search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          slotProps={{
            htmlInput: { 'aria-label': 'Search tasks' },
            input: {
              startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment>,
              endAdornment: search ? <InputAdornment position="end">
                <IconButton label="Clear search" onClick={() => dispatch(setSearch(''))}><CloseRounded fontSize="small" />
                </IconButton>
                </InputAdornment> : undefined,
            },
          }}
        />
        <TextField select size="small" label="Sort tasks" value={sort} onChange={(event) => dispatch(setSort(event.target.value as TodoSort))} sx={{ minWidth: 155, width: { xs: '100%', sm: 170 }, flexShrink: 0 }}>
          <MenuItem value="newest">Newest first</MenuItem>
          <MenuItem value="oldest">Oldest first</MenuItem>
          <MenuItem value="alphabetical">A to Z</MenuItem>
        </TextField>
      </Stack>
      <FilterTabs counts={counts} />
    </Box>
  );
}
