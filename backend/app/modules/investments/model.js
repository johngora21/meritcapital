import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Investment = sequelize.define('investments', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  investor_user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  startup_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  amount_text: { type: DataTypes.STRING(64), allowNull: true },
  note: { type: DataTypes.TEXT, allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

export default { Investment };

