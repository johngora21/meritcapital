import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const User = sequelize.define('users', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(191), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  full_name: { type: DataTypes.STRING(191), allowNull: false },
  role: { type: DataTypes.ENUM('admin','mentor','investor','entrepreneur'), allowNull: false, defaultValue: 'entrepreneur' },
  avatar_url: { type: DataTypes.STRING(512), allowNull: true },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default User;

