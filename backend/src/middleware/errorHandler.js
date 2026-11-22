import { HttpError } from '../utils/HttpError.js';
import { jsonView } from '../views/jsonView.js';

export function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return jsonView.error(res, error.status, error.message, error.fields);
  }
  if (error.type === 'entity.parse.failed') {
    return jsonView.error(res, 400, 'The request body must be valid JSON.');
  }
  if (error.type === 'entity.too.large') {
    return jsonView.error(res, 413, 'This request is too large.');
  }
  console.error(`[api] ${error.code ?? error.name ?? 'Unexpected error'}`);
  return jsonView.error(res, 500, 'We couldn’t save or load your tasks. Please try again shortly.');
}
