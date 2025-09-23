import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './env.js';

export const buildSecurity = (app) => {
  app.use(helmet());
  
  // In development, allow all origins for easier debugging
  const corsOptions = env.nodeEnv === 'development' 
    ? { origin: true, credentials: true }
    : {
        origin: env.corsOrigin || '*',
        credentials: true,
        methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type','Authorization'],
      };
  
  app.use(cors(corsOptions));
  app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));
};

export default buildSecurity;

