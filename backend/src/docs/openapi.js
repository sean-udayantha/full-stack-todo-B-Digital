const schemaRef = (name) => ({ $ref: `#/components/schemas/${name}` });
const responseRef = (name) => ({ $ref: `#/components/responses/${name}` });
const json = (schema) => ({ 'application/json': { schema } });

const title = {
  type: 'string', minLength: 1, maxLength: 120,
  description: 'Trimmed before saving. A title containing only whitespace is invalid.',
  example: 'test the API title',
};
const description = {
  type: 'string', maxLength: 1000,
  description: 'Trimmed before saving. An empty string clears the description.',
  example: 'test the API description',
};
const writeErrors = {
  400: responseRef('BadRequest'),
  413: responseRef('PayloadTooLarge'),
  500: responseRef('ServerError'),
};

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Daylist API',
    version: '1.0.0',
    description: 'Manage your TODO list. Expand an endpoint, edit the sample values, and select Execute to send a real request. No authentication is required for this local app.',
  },
  // A relative server URL follows whichever host and port serves Swagger UI.
  servers: [{ url: '/api', description: 'Current backend server' }],
  tags: [
    { name: 'TODOs', description: 'Create, view, edit, complete and delete tasks.' },
    { name: 'Health', description: 'Check the API and MySQL connection.' },
  ],
  paths: {
    '/todos': {
      get: {
        tags: ['TODOs'], operationId: 'listTodos', summary: 'Get all TODO items',
        description: 'Returns all tasks, newest first.',
        responses: {
          200: {
            description: 'The current TODO list. An empty list is returned as data: [].',
            content: json({ type: 'object', required: ['data'], properties: { data: { type: 'array', items: schemaRef('Todo') } } }),
          },
          500: responseRef('ServerError'),
        },
      },
      post: {
        tags: ['TODOs'], operationId: 'createTodo', summary: 'Create a TODO',
        description: 'Requires a title. Description is optional; new tasks start with done: false.',
        requestBody: { required: true, content: json(schemaRef('CreateTodo')) },
        responses: {
          201: {
            description: 'The newly created task.',
            headers: { Location: { description: 'The created task’s API path.', schema: { type: 'string', example: '/api/todos/1' } } },
            content: json(schemaRef('TodoResponse')),
          },
          ...writeErrors,
        },
      },
    },
    '/todos/{id}': {
      parameters: [{ $ref: '#/components/parameters/TodoId' }],
      put: {
        tags: ['TODOs'], operationId: 'updateTodo', summary: 'Edit a TODO',
        description: 'Update the title, description, or both. Provide at least one field. This endpoint does not change done status.',
        requestBody: { required: true, content: json(schemaRef('UpdateTodo')) },
        responses: {
          200: { description: 'The updated task.', content: json(schemaRef('TodoResponse')) },
          ...writeErrors,
          404: responseRef('NotFound'),
        },
      },
      delete: {
        tags: ['TODOs'], operationId: 'deleteTodo', summary: 'Delete a TODO',
        description: 'Permanently removes the task with this ID.',
        responses: {
          204: { description: 'Task deleted. The response has no body.' },
          400: responseRef('BadRequest'),
          404: responseRef('NotFound'),
          500: responseRef('ServerError'),
        },
      },
    },
    '/todos/{id}/done': {
      parameters: [{ $ref: '#/components/parameters/TodoId' }],
      patch: {
        tags: ['TODOs'], operationId: 'toggleTodoDone', summary: 'Toggle done / undone',
        description: 'Flips the task’s current done status. No request body is needed. Calling this twice returns it to its original status.',
        responses: {
          200: { description: 'The task with its new done status.', content: json(schemaRef('TodoResponse')) },
          ...writeErrors,
          404: responseRef('NotFound'),
        },
      },
    },
    '/health': {
      get: {
        tags: ['Health'], operationId: 'getHealth', summary: 'Check database connectivity',
        responses: {
          200: {
            description: 'API and MySQL are available.',
            content: json({
              type: 'object', required: ['data'],
              properties: {
                data: {
                  type: 'object', required: ['status', 'database'],
                  properties: { status: { type: 'string', enum: ['ok'] }, database: { type: 'string', enum: ['connected'] } },
                },
              },
            }),
          },
          503: {
            description: 'MySQL is unavailable.',
            content: { 'application/json': { schema: schemaRef('ErrorResponse'), example: { error: { message: 'The database is unavailable. Please try again shortly.' } } } },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      TodoId: {
        name: 'id', in: 'path', required: true, description: 'A task ID returned by create or list.',
        schema: { type: 'integer', minimum: 1, maximum: 4294967295 }, example: 1,
      },
    },
    schemas: {
      Todo: {
        type: 'object', required: ['id', 'title', 'description', 'done', 'createdAt', 'updatedAt'],
        properties: {
          id: { type: 'integer', minimum: 1, maximum: 4294967295, readOnly: true, example: 1 },
          title, description,
          done: { type: 'boolean', readOnly: true, example: false },
          createdAt: { type: 'string', format: 'date-time', readOnly: true, example: '2026-11-22T09:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', readOnly: true, example: '2026-11-22T09:00:00.000Z' },
        },
      },
      CreateTodo: {
        type: 'object', required: ['title'], additionalProperties: false,
        properties: { title, description: { ...description, default: '' } },
      },
      UpdateTodo: {
        type: 'object', minProperties: 1, additionalProperties: false,
        properties: { title, description },
      },
      TodoResponse: { type: 'object', required: ['data'], properties: { data: schemaRef('Todo') } },
      ErrorResponse: {
        type: 'object', required: ['error'],
        properties: {
          error: {
            type: 'object', required: ['message'],
            properties: { message: { type: 'string' }, fields: { type: 'object', additionalProperties: { type: 'string' } } },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Invalid task ID, request fields, or JSON body.',
        content: { 'application/json': { schema: schemaRef('ErrorResponse'), example: { error: { message: 'Please check your task details.', fields: { title: 'Give your task a title.' } } } } },
      },
      NotFound: {
        description: 'The task does not exist.',
        content: { 'application/json': { schema: schemaRef('ErrorResponse'), example: { error: { message: 'This task no longer exists. Refresh your list and try again.' } } } },
      },
      PayloadTooLarge: {
        description: 'The JSON request exceeds the 16 KB body limit.',
        content: { 'application/json': { schema: schemaRef('ErrorResponse'), example: { error: { message: 'This request is too large.' } } } },
      },
      ServerError: {
        description: 'An unexpected server or database error.',
        content: { 'application/json': { schema: schemaRef('ErrorResponse'), example: { error: { message: 'We couldn’t save or load your tasks. Please try again shortly.' } } } },
      },
    },
  },
};
