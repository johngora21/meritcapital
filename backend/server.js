import express from 'express';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { sequelize } from './config/database.js';
import buildSecurity from './config/security.js';
import router from './routes/index.js';
import authRoutes from './app/modules/auth/routes.js';
import { errorHandler } from './app/core/http/error.js';
import { httpLogger } from './app/core/utils/logger.js';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(httpLogger);
buildSecurity(app);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', router);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    // Sync in dev; for prod use migrations.
    await sequelize.sync({ alter: false });
    app.listen(env.port, () => console.log(`API listening on :${env.port}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

