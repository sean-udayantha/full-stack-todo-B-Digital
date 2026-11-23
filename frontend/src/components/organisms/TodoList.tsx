import { Avatar, Box, List, Skeleton, Stack, Typography } from '@mui/material';
import CloudOffOutlined from '@mui/icons-material/CloudOffOutlined';
import SearchOffRounded from '@mui/icons-material/SearchOffRounded';
import ChecklistRounded from '@mui/icons-material/ChecklistRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import type { Notice, Todo, TodoFilter } from '../../types/todo';
import { Button } from '../atoms/Button';
import { TodoItem } from '../molecules/TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error?: string;
  hasData: boolean;
  filter: TodoFilter;
  search: string;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onCreate: () => void;
  onReset: () => void;
  onRetry: () => void;
  onNotify: (notice: Notice) => void;
}

export function TodoList(props: TodoListProps) {
  if (props.loading) {
    return (
      <Stack role="status" aria-label="Loading your tasks" spacing={3} sx={{ p: 3 }}>
        {[0, 1, 2].map((index) => <Stack key={index} direction="row" spacing={2}><Skeleton variant="rounded" width={28} height={28} /><Box sx={{ flex: 1 }}><Skeleton width="70%" /><Skeleton width="90%" /></Box></Stack>)}
      </Stack>
    );
  }

  const offline = Boolean(props.error && !props.hasData);
  if (offline || !props.todos.length) {
    const filtered = Boolean(props.search.trim() || props.filter !== 'all');
    const Icon = offline ? CloudOffOutlined : filtered ? SearchOffRounded : ChecklistRounded;
    return (
      <Stack sx={{ px: 3, py: 7, alignItems: 'center', textAlign: 'center', minHeight: 330 }} spacing={2}>
        <Avatar sx={{ bgcolor: 'action.selected', color: 'primary.main', width: 64, height: 64 }}><Icon fontSize="large" /></Avatar>
        <Typography component="h3" variant="h2">
          {offline ? 'Let’s get you reconnected.' : filtered ? 'A little quiet in this view.' : 'A clear space. A fresh start.'}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 330 }}>
          {offline ? props.error : filtered ? 'No tasks match right now. Try another search or view all your tasks.' : 'Get that first idea out of your head and onto your list.'}
        </Typography>
        <Button
          variant={offline || filtered ? 'secondary' : 'primary'}
          startIcon={!offline && !filtered ?
            <AddRounded /> : undefined}
          onClick={offline ? props.onRetry : filtered ? props.onReset : props.onCreate}>
          {offline ? 'Try again' : filtered ? 'View all tasks' : 'Create your first task'}
        </Button>
      </Stack>
    );
  }
  return <List disablePadding aria-label="Tasks">
    {props.todos.map((todo) =>
      <TodoItem
        key={todo.id}
        todo={todo}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onNotify={props.onNotify} />
    )}
  </List>;
}
