import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export const Session = sequelize.define('sessions', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  token: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  user_agent: { type: DataTypes.STRING(255), allowNull: true },
  ip: { type: DataTypes.STRING(64), allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  expires_at: { type: DataTypes.DATE, allowNull: true },
}, { timestamps: false });

export default { Session };

