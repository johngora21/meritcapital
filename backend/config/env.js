import dotenv from 'dotenv';

dotenv.config();

const required = (key, fallback = undefined) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required env var ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  jwtSecret: required('JWT_SECRET', 'dev-secret-change'),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  db: {
    host: required('DB_HOST', '127.0.0.1'),
    port: Number(process.env.DB_PORT || 3306),
    user: required('DB_USER', 'root'),
    pass: process.env.DB_PASS || '',
    name: required('DB_NAME', 'merit_capital'),
  },
};

export default env;





