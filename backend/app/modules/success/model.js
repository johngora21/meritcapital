import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const SuccessStory = sequelize.define('success_stories', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(191), allowNull: false },
  summary: { type: DataTypes.TEXT, allowNull: true },
  image_url: { type: DataTypes.STRING(512), allowNull: true },
  link: { type: DataTypes.STRING(512), allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export default { SuccessStory };






