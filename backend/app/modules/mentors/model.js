import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Mentor = sequelize.define('mentors', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  expertise: { type: DataTypes.STRING(255), allowNull: true },
  bio: { type: DataTypes.TEXT, allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export default { Mentor };

