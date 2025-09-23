import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export const PasswordReset = sequelize.define('password_resets', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  token: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  used_at: { type: DataTypes.DATE, allowNull: true },
}, { timestamps: false });

export default { PasswordReset };


