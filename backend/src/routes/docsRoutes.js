import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from '../docs/openapi.js';

export function createDocsRouter() {
  const router = Router();
  const options = {
    customSiteTitle: 'Daylist API Explorer',
    swaggerOptions: {
      url: '/api-docs.json',
      validatorUrl: null,
      tryItOutEnabled: true,
      displayRequestDuration: true,
    },
  };

  router.get('/api-docs.json', (_req, res) => {
    res.set('Cache-Control', 'no-store').json(openApiSpec);
  });
  router.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
  return router;
}

