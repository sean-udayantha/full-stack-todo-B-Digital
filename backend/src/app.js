import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { jsonView } from './views/jsonView.js';

export function createApp({ checkDatabase }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        upgradeInsecureRequests: env.NODE_ENV === 'production' ? [] : null,
      },
    },
  }));
  const allowedOrigins = env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim());
  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }));
  app.use(express.json({ limit: '16kb' }));
  app.use('/api', (_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.get('/api/health', async (_req, res) => {
    try {
      await checkDatabase();
      return jsonView.data(res, { status: 'ok', database: 'connected' });
    } catch {
      return jsonView.error(res, 503, 'The database is unavailable. Please try again shortly.');
    }
  });
  app.use((_req, res) => jsonView.error(res, 404, 'This API endpoint does not exist.'));
  app.use(errorHandler);
  return app;
}
