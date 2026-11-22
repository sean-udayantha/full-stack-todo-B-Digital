import { Router } from 'express';
import { createTodoController } from '../controllers/todoController.js';
import { validateBody, validateId } from '../middleware/validate.js';
import { createTodoSchema, updateTodoSchema, toggleTodoSchema } from '../validation/todoSchema.js';

export function createTodoRouter(model) {
  const router = Router();
  const controller = createTodoController(model);
  router.get('/', controller.list);
  router.post('/', validateBody(createTodoSchema), controller.create);
  router.put('/:id', validateId, validateBody(updateTodoSchema), controller.update);
  router.patch('/:id/done', validateId, validateBody(toggleTodoSchema), controller.toggleDone);
  router.delete('/:id', validateId, controller.remove);
  return router;
}
