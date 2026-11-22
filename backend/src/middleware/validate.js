import { HttpError } from '../utils/HttpError.js';
import { todoIdSchema } from '../validation/todoSchema.js';

export const validateBody = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) {
    const fields = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] ?? 'form';
      fields[field] ??= issue.message;
    }
    return next(new HttpError(400, 'Please check your task details.', fields));
  }
  req.validatedBody = result.data;
  next();
};

export function validateId(req, _res, next) {
  const result = todoIdSchema.safeParse(req.params.id);
  if (!result.success) return next(new HttpError(400, 'Task ID must be a valid positive integer.'));
  req.todoId = result.data;
  next();
}
