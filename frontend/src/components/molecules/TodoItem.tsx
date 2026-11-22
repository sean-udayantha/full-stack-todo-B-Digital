import { Box, Checkbox, ListItem, Stack, Typography } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import { Badge } from '../atoms/Badge';
import { IconButton } from '../atoms/IconButton';
import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export function TodoItem({ todo, onEdit, onDelete, }: TodoItemProps) {
  

  return (
    <ListItem divider sx={{ alignItems: 'flex-start', gap: 1, py: 2.5, px: { xs: 1.5, sm: 3 } }}>
      <Checkbox
        checked={todo.done} disabled={true} onChange={() => {}} size="small" sx={{ p: 0.5 }}
        slotProps={{ input: { 'aria-label': `Mark ${todo.title} as ${todo.done ? 'active' : 'done'}` } }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography component="h3" variant="h3" sx={{ color: todo.done ? 'text.secondary' : 'text.primary', textDecoration: todo.done ? 'line-through' : 'none', overflowWrap: 'anywhere', lineHeight: 1.6 }}>
          {todo.title}
        </Typography>
        {todo.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{todo.description}</Typography>}
        <Typography component="p" variant="caption" color="text.secondary" sx={{ mt: 1 }}>Added {new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(todo.createdAt))}</Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' }, pt: 0.25 }}>
        <Badge done={todo.done} /></Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.5}>
        <IconButton label={`Edit ${todo.title}`} disabled={true} onClick={() => onEdit(todo)}><EditOutlined fontSize="small" /></IconButton>
        <IconButton label={`Delete ${todo.title}`} color="error" disabled={true} onClick={() => onDelete(todo)}><DeleteOutlineRounded fontSize="small" /></IconButton>
      </Stack>
    </ListItem>
  );
}
