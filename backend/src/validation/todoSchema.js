import { z } from 'zod';

const todoFields = {
  title: z.string().trim().min(1, 'Give your task a title.').max(120, 'Use 120 characters or fewer.'),
  description: z.string().trim().max(1000, 'Use 1,000 characters or fewer.'),
};

export const createTodoSchema = z.object({
  ...todoFields,
  description: todoFields.description.default(''),
}).strict();

export const updateTodoSchema = z.object(todoFields).partial().strict()
  .refine((value) => Object.keys(value).length > 0, 'Provide a title or description to update.');

export const todoIdSchema = z.string().regex(/^[1-9]\d*$/, 'Task ID must be a positive integer.')
  .transform(Number)
  .refine((id) => Number.isSafeInteger(id) && id <= 4294967295, 'Task ID is out of range.');

export const toggleTodoSchema = z.object({}).strict();
