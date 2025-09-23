import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Startup = sequelize.define('startups', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  name: { type: DataTypes.STRING(191), allowNull: false },
  sector: { type: DataTypes.STRING(128), allowNull: true },
  stage: { type: DataTypes.STRING(64), allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export default { Startup };

