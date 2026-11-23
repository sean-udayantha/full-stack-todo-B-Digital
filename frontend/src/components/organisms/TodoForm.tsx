import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, DialogActions, Stack, Typography } from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { todoSchema, type TodoFormValues } from '../../features/todos/todoSchema';
import { getApiError } from '../../utils/apiError';
import type { Todo } from '../../types/todo';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (values: TodoFormValues) => Promise<void>;
  onCancel: () => void;
  onBusyChange?: (busy: boolean) => void;
}

export function TodoForm({ todo, onSubmit, onCancel, onBusyChange }: TodoFormProps) {

  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } =
    useForm<TodoFormValues>({
      resolver: zodResolver(todoSchema),
      defaultValues: { title: todo?.title ?? '', description: todo?.description ?? '' },
      mode: 'onTouched',
    });

  const submit = async (values: TodoFormValues) => {
    setSubmitError('');
    onBusyChange?.(true);
    try {
      await onSubmit(values);
    } catch (error) {
      const apiError = getApiError(error);
      setSubmitError(apiError.message);
      for (const [name, message] of Object.entries(apiError.fields ?? {})) {
        if (name === 'title' || name === 'description') setError(name, { message }, { shouldFocus: true });
      }
    } finally {
      onBusyChange?.(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate aria-label={todo ? 'Edit task' : 'Create task'}>
      <Stack spacing={3} sx={{ pt: 1 }}>
        <FormField
          {...register('title')} label="Task title" error={errors.title?.message}
          disabled={isSubmitting} autoComplete="off"
          placeholder="What would you like to get done?" slotProps={{ htmlInput: { maxLength: 120, 'data-autofocus': true } }}
        />
        <FormField
          {...register('description')} label="Description" optional error={errors.description?.message}
          multiline rows={4} disabled={isSubmitting} placeholder="A few details, a small plan, or a reminder…"
          slotProps={{ htmlInput: { maxLength: 1000 } }}
        />
      </Stack>
      <Typography variant="caption" component="p" color="text.secondary" sx={{ mt: 1.5 }}>Small and specific is a great place to start.</Typography>
      {submitError && <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>}
      <DialogActions sx={{ px: 0, pt: 3, gap: 1 }}>
        <Button variant="secondary" disabled={isSubmitting} onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={isSubmitting} startIcon={todo ? <CheckRounded /> : <AddRounded />}>
          {isSubmitting ? 'Saving…' : todo ? 'Save changes' : 'Create task'}
        </Button>
      </DialogActions>
    </Box>
  );
}
