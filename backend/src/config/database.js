import mysql from 'mysql2/promise';
import { env } from './env.js';

export const connectionOptions = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  charset: 'utf8mb4',
  timezone: 'Z',
  connectTimeout: 10000,
};

export const pool = mysql.createPool({
  ...connectionOptions,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 100,
});

export async function checkDatabase() {
  await pool.query('SELECT 1');
}
