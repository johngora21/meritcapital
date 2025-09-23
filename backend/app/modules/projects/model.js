import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Project = sequelize.define('projects', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  owner_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  name: { type: DataTypes.STRING(191), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  stage: { type: DataTypes.ENUM('Idea','MVP','Growth','Scale'), defaultValue: 'Idea' },
  industry: { type: DataTypes.STRING(128), allowNull: true },
  status: { type: DataTypes.ENUM('Active','Paused','Archived'), defaultValue: 'Active' },
  revenue_text: { type: DataTypes.STRING(64), allowNull: true },
  last_updated: { type: DataTypes.DATEONLY, allowNull: true },
  image_url: { type: DataTypes.STRING(512), allowNull: true },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export const ProjectTag = sequelize.define('project_tags', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  project_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  tag: { type: DataTypes.STRING(64), allowNull: false },
}, { timestamps: false });

Project.hasMany(ProjectTag, { foreignKey: 'project_id', as: 'tags' });
ProjectTag.belongsTo(Project, { foreignKey: 'project_id' });

export const ProjectReview = sequelize.define('project_reviews', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  project_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  reviewer_user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  decision: { type: DataTypes.ENUM('approve','reject'), allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
  decided_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, { timestamps: false });

export const ProjectMentorAssignment = sequelize.define('project_mentor_assignments', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  project_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  mentor_user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  assigned_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, { timestamps: false });

Project.hasMany(ProjectReview, { foreignKey: 'project_id', as: 'reviews' });
Project.hasMany(ProjectMentorAssignment, { foreignKey: 'project_id', as: 'mentor_assignments' });

export default { Project, ProjectTag, ProjectReview, ProjectMentorAssignment };

