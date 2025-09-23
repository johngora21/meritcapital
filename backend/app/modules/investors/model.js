import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Investor = sequelize.define('investors', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  firm: { type: DataTypes.STRING(191), allowNull: true },
  focus: { type: DataTypes.STRING(255), allowNull: true },
  verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export default { Investor };

