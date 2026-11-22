import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().trim().min(1, 'Give your task a title.').max(120, 'Use 120 characters or fewer.'),
  description: z.string().trim().max(1000, 'Use 1,000 characters or fewer.'),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
