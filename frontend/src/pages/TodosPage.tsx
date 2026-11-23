import React, { useCallback, useState } from 'react'
import { Badge } from '../components/atoms/Badge'
import { Button } from '../components/atoms/Button'
import { Spinner } from '../components/atoms/Spinner'
import { Logo } from '../components/atoms/Logo'
import { FilterTabs } from '../components/molecules/FilterTabs'
import { FormField } from '../components/molecules/FormField'
import { TodoItem } from '../components/molecules/TodoItem'
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../features/todos/todosApi'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Notice, Todo, TodoFilter } from '../types/todo'
import { TodoFormValues } from '../features/todos/todoSchema'
import { selectVisibleTodos } from '../utils/selectTodos'
import { resetFilters } from '../features/ui/uiSlice'
import { getApiError } from '../utils/apiError'
import { DashboardTemplate } from '../components/templates/DashboardTemplate'
import { Sidebar } from '../components/organisms/Sidebar'
import { Alert, Box, Card, CardHeader, Chip, DialogActions, Divider, Stack, Typography } from '@mui/material'
import { AddRounded, DeleteOutlineRounded, ErrorOutlineRounded, LightModeOutlined } from '@mui/icons-material'
import { TaskToolbar } from '../components/organisms/TaskToolbar'
import { TodoList } from '../components/organisms/TodoList'
import { ProgressPanel } from '../components/organisms/ProgressPanel'
import { TodoForm } from '../components/organisms/TodoForm'
import { Toast } from '../components/molecules/Toast'
import { Modal } from '../components/organisms/Modal'

export function TodosPage() {

  const [form, setForm] = useState<{ todo?: Todo } | null>(null);
  const [formBusy, setFormBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Todo | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [notice, setNotice] = useState<Notice | null>(null);
  const dismissNotice = useCallback(() => setNotice(null), []);


  const { data, isLoading, isFetching, error, refetch } = useGetTodosQuery();
  console.log("🚀 ~ TodosPage ~ data:", data)
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();


  const { filter, search, sort } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const completed = data?.filter((todo) => todo.done).length;
  const counts: Record<TodoFilter, number | undefined> = {
    all: data?.length,
    active: data ? data.length - (completed ?? 0) : undefined,
    completed,
  };
  const visible = selectVisibleTodos(data ?? [], filter, search, sort);



  const handleSave = async (values: TodoFormValues) => {
    if (form?.todo) {
      await updateTodo({ id: form.todo.id, values }).unwrap();
      setNotice({ kind: 'success', message: 'Task updated. A little more clarity.' });
    } else {
      await createTodo(values).unwrap();
      dispatch(resetFilters());
      setNotice({ kind: 'success', message: 'Task created. One small step starts here.' });
    }
    setForm(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError('');
    try {
      await deleteTodo(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      setNotice({ kind: 'success', message: 'Task deleted. A little more headspace.' });
    } catch (requestError) {
      setDeleteError(getApiError(requestError).message);
    }
  };
  return (
    // <div>
    //   <Badge done={true} />
    //   <Button variant="primary" color="primary">test</Button>
    //   <Logo />  
    //   <Spinner label="Loading..." />
    //   <FilterTabs counts={{ all: 5, active: 3, completed: 2 }} />
    //   <FormField label="Task title" name="title" value="" onChange={() => {}} />
    //   <TodoItem todo={{ id: 1, title: 'Test task', description: 'This is a test task', done: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }} onEdit={() => {}} onDelete={() => {}}  onNotify={() => {}}/>
    // </div>
    <DashboardTemplate sidebar={<Sidebar counts={counts} />}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'space-between', mb: 4 }}>
        <Button startIcon={<AddRounded />} onClick={() => { setFormBusy(false); setForm({}); }} sx={{ flexShrink: 0 }}>
        New task
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 270px' }, gap: 3, alignItems: 'start' }}>
        <Card component="section" aria-labelledby="tasks-heading" sx={{ minWidth: 0 }}>
          <CardHeader
            sx={{ p: { xs: 2, sm: 3 }, alignItems: 'flex-start' }}
            title={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography component="h2" id="tasks-heading" variant="h2">Your tasks</Typography>
                <Chip size="small" label={data?.length ?? '—'} />
              </Stack>
            }
            subheader=""
            action={
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mt: 0.5 }} aria-live="polite">
                {isFetching ? 
                <Spinner label="Syncing tasks" /> : error ? 
                <ErrorOutlineRounded fontSize="small" color="warning" /> : null}
                <Typography variant="caption" color="text.secondary">
                  {isFetching ? 'Syncing…' : error ? 'Offline' : 'Up to date'}
                </Typography>
              </Stack>
            }
            slotProps={{ subheader: { sx: { mt: 1 } } }}
          />
          <TaskToolbar counts={counts} />
          {error && data && 
          <Alert severity="warning" 
          action={
          <Button variant="ghost" onClick={() => refetch()}>
            Try syncing again
          </Button>
          }>
          Your list may be out of date.
          </Alert>}
          <TodoList
            todos={visible} loading={isLoading} error={error ? getApiError(error).message : undefined}
            hasData={data !== undefined} filter={filter} search={search}
            onCreate={() => { setFormBusy(false); setForm({}); }}
            onEdit={(todo) => { setFormBusy(false); setForm({ todo }); }}
            onDelete={(todo) => { setDeleteError(''); setDeleteTarget(todo); }}
            onRetry={() => refetch()} onReset={() => dispatch(resetFilters())} onNotify={setNotice}
          />
          <Divider />
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', p: 2, color: 'text.secondary' }}>
            <Typography variant="caption">{data ? `${visible.length} ${visible.length === 1 ? 'task' : 'tasks'} in this view` : 'Your tasks will appear here'}</Typography><Typography variant="caption">One thing at a time.</Typography>
          </Stack>
        </Card>
        <ProgressPanel total={data?.length} completed={completed} />
      </Box>

      {form && (
        <Modal title={form.todo ? 'A little fine-tuning.' : 'What’s on your mind?'} subtitle={form.todo ? 'Plans change. Give this task a fresh perspective.' : 'Turn a thought into your next small step.'} onClose={() => setForm(null)} busy={formBusy}>
          <TodoForm key={form.todo?.id ?? 'new'} todo={form.todo} onSubmit={handleSave} onCancel={() => setForm(null)} onBusyChange={setFormBusy} />
        </Modal>
      )}
      {deleteTarget && (
        <Modal title="Make a little room?" subtitle="This task will be permanently deleted." onClose={() => setDeleteTarget(null)} busy={isDeleting}>
          <Alert severity="warning" icon={<DeleteOutlineRounded />} sx={{ overflowWrap: 'anywhere' }}>{deleteTarget.title}</Alert>
          {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
          <DialogActions sx={{ px: 0, pt: 3, gap: 1 }}>
            <Button variant="secondary" data-autofocus disabled={isDeleting} onClick={() => setDeleteTarget(null)}>Keep task</Button>
            <Button variant="danger" loading={isDeleting} startIcon={<DeleteOutlineRounded />} onClick={handleDelete}>{isDeleting ? 'Deleting…' : 'Delete task'}</Button>
          </DialogActions>
        </Modal>
      )}
      <Toast notice={notice} onDismiss={dismissNotice} />
    </DashboardTemplate>
  )
}


