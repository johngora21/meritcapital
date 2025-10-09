import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const SuccessStory = sequelize.define('success_stories', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(191), allowNull: false },
  full_story: { type: DataTypes.TEXT, allowNull: true },
  image_url: { type: DataTypes.TEXT, allowNull: true },
  video_url: { type: DataTypes.STRING(512), allowNull: true },
  industry: { type: DataTypes.STRING(191), allowNull: true },
  date: { type: DataTypes.DATE, allowNull: true },
  published_date: { type: DataTypes.DATE, allowNull: true },
  link: { type: DataTypes.STRING(512), allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export default { SuccessStory };






