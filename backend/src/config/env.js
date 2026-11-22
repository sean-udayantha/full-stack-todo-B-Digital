import dotenv from 'dotenv';
import { z } from 'zod';


dotenv.config({ path: new URL('../../.env', import.meta.url) });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173,http://127.0.0.1:5173'),
  DB_HOST: z.string().min(1).default('127.0.0.1'),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
  DB_USER: z.string().min(1).default('root'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/).default('daylist'),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  const fields = result.error.issues.map((issue) => issue.path.join('.')).join(', ');
  throw new Error(`Invalid backend configuration: ${fields}. Check backend/.env.`);
}

export const env = result.data;
