import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import { connectionOptions, pool } from '../src/config/database.js';
import { env } from '../src/config/env.js';

let connection;
try {
  connection = await mysql.createConnection(connectionOptions);
  // DB_NAME is restricted to letters, digits and underscores by env validation.
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`);
  await connection.changeUser({ database: env.DB_NAME });
  const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8');
  await connection.query(schema);
  console.log(`Database "${env.DB_NAME}" is ready. Existing tasks were preserved.`);
} catch (error) {
  console.error(`Database setup failed (${error.code ?? 'unknown error'}).`);
  console.error('Check backend/.env and make sure MySQL is running. The user needs CREATE permission for initial setup.');
  process.exitCode = 1;
} finally {
  await connection?.end();
  await pool.end();
}
