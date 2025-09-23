import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.pass, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'mysql',
  logging: env.nodeEnv === 'development' ? false : false,
  pool: { max: 10, min: 0, idle: 10000 },
  define: { underscored: false, freezeTableName: true, timestamps: true },
});

export default sequelize;

