import { sequelize } from '../config/database.js';

async function migrate() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log('Database synced.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

migrate();

