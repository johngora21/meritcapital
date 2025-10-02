import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const User = sequelize.define('users', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(191), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  full_name: { type: DataTypes.STRING(191), allowNull: false },
  phone: { type: DataTypes.STRING(32), allowNull: true },
  location: { type: DataTypes.STRING(191), allowNull: true },
  bio: { type: DataTypes.TEXT, allowNull: true },
  company: { type: DataTypes.STRING(191), allowNull: true },
  position: { type: DataTypes.STRING(191), allowNull: true },
  website: { type: DataTypes.STRING(512), allowNull: true },
  linkedin: { type: DataTypes.STRING(512), allowNull: true },
  twitter: { type: DataTypes.STRING(512), allowNull: true },
  role: { type: DataTypes.ENUM('admin','mentor','investor','entrepreneur'), allowNull: false, defaultValue: 'entrepreneur' },
  avatar: { type: DataTypes.TEXT, allowNull: true },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default User;




