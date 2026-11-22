import { createApp } from './app.js';
import { env } from './config/env.js';
import { pool, checkDatabase } from './config/database.js';
// import { createTodoModel } from './models/todoModel.js';

try {
  await checkDatabase();
  // Fail early with setup guidance if the database exists but the table is missing.
  await pool.query('SELECT id FROM todos LIMIT 0');
  const app = createApp({ checkDatabase });
  const server = app.listen(env.PORT, () => {
    console.log(`Daylist API is ready at http://localhost:${env.PORT}/api`);
    console.log(`Swagger UI: http://localhost:${env.PORT}/api-docs`);
  });
  server.on('error', async (error) => {
    console.error(`API could not start (${error.code}). Check PORT in backend/.env.`);
    await pool.end();
    process.exitCode = 1;
  });
  let closing = false;
  const shutdown = () => {
    if (closing) return;
    closing = true;
    const timeout = setTimeout(() => process.exit(1), 10000).unref();
    server.close(async () => {
      await pool.end();
      clearTimeout(timeout);
      process.exitCode = 0;
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
} catch (error) {
  console.error(`API startup failed (${error.code ?? error.name ?? 'unknown error'}): ${error.message}`);
  await pool.end();
  process.exitCode = 1;
}

