import { HttpError } from '../utils/HttpError.js';
import { jsonView } from '../views/jsonView.js';

function requireTodo(todo) {
  if (!todo) throw new HttpError(404, 'This task no longer exists. Refresh your list and try again.');
  return todo;
}

export function createTodoController(model) {
  return {
    async list(_req, res) {
      return jsonView.data(res, await model.findAll());
    },
    async create(req, res) {
      const todo = await model.create(req.validatedBody);
      res.location(`/api/todos/${todo.id}`);
      return jsonView.data(res, todo, 201);
    },
    async update(req, res) {
      return jsonView.data(res, requireTodo(await model.update(req.todoId, req.validatedBody)));
    },
    async toggleDone(req, res) {
      return jsonView.data(res, requireTodo(await model.toggleDone(req.todoId)));
    },
    async remove(req, res) {
      requireTodo(await model.remove(req.todoId));
      return jsonView.empty(res);
    },
  };
}
