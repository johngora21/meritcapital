import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Notification = sequelize.define('notifications', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  title: { type: DataTypes.STRING(191), allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: true },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

export default { Notification };

