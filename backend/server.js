import express from 'express';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { sequelize } from './config/database.js';
import buildSecurity from './config/security.js';
import router from './routes/index.js';
import { errorHandler } from './app/core/http/error.js';
import { httpLogger } from './app/core/utils/logger.js';

const app = express();

// Security and CORS must run before body parsing to ensure CORS headers on failures
buildSecurity(app);

// Increase payload limits to support larger submissions (e.g., rich descriptions, images as data URLs)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());
app.use(httpLogger);

app.use('/api/v1', router);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    // Avoid alter sync to prevent deadlocks; run migrations instead
    if (env.nodeEnv === 'development') {
      await sequelize.sync({ alter: false });
    }
    app.listen(env.port, () => console.log(`API listening on :${env.port}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

