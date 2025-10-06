import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './env.js';

export const buildSecurity = (app) => {
  app.use(helmet());
  
  // In development, allow all origins for easier debugging
  const allowedOrigin = env.nodeEnv === 'development' 
    ? 'http://localhost:1570'
    : (env.corsOrigin || '*');

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow no-origin requests (like curl or same-origin)
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigin === '*' || origin === allowedOrigin;
      callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  };
  
  app.use(cors(corsOptions));
  // Explicitly respond to preflight requests
  app.options('*', cors(corsOptions));
  app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));
};

export default buildSecurity;

