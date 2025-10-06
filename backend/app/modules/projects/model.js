import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const Project = sequelize.define('projects', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  owner_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  name: { type: DataTypes.STRING(191), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  stage: { type: DataTypes.ENUM('Idea','MVP','Early Stage','Growth','Scale','Mature'), defaultValue: 'Idea' },
  industry: { type: DataTypes.STRING(128), allowNull: true },
  status: { type: DataTypes.ENUM('Active','Paused','Archived'), defaultValue: 'Active' },
  revenue_text: { type: DataTypes.STRING(64), allowNull: true },
  last_updated: { type: DataTypes.DATEONLY, allowNull: true },
  image_url: { type: DataTypes.STRING(512), allowNull: true },
  
  // Additional fields for comprehensive project data
  tagline: { type: DataTypes.STRING(255), allowNull: true },
  website: { type: DataTypes.STRING(512), allowNull: true },
  linkedin: { type: DataTypes.STRING(512), allowNull: true },
  founded: { type: DataTypes.DATEONLY, allowNull: true },
  employees: { type: DataTypes.STRING(64), allowNull: true },
  seeking: { type: DataTypes.TEXT, allowNull: true },
  
  // Founder information
  founder_name: { type: DataTypes.STRING(191), allowNull: true },
  founder_role: { type: DataTypes.STRING(128), allowNull: true },
  founder_email: { type: DataTypes.STRING(191), allowNull: true },
  founder_phone: { type: DataTypes.STRING(32), allowNull: true },
  
  // Location
  headquarters_country: { type: DataTypes.STRING(128), allowNull: true },
  headquarters_city: { type: DataTypes.STRING(128), allowNull: true },
  
  // Legal & Business
  legal_structure: { type: DataTypes.STRING(128), allowNull: true },
  registration_number: { type: DataTypes.STRING(128), allowNull: true },
  tax_id: { type: DataTypes.STRING(128), allowNull: true },
  
  // Market & Product
  primary_market: { type: DataTypes.STRING(128), allowNull: true },
  problem_statement: { type: DataTypes.TEXT, allowNull: true },
  solution_description: { type: DataTypes.TEXT, allowNull: true },
  target_customer: { type: DataTypes.STRING(255), allowNull: true },
  value_proposition: { type: DataTypes.TEXT, allowNull: true },
  competitive_advantage: { type: DataTypes.TEXT, allowNull: true },
  
  // Funding
  funding_stage: { type: DataTypes.STRING(64), allowNull: true },
  funding_raised: { type: DataTypes.STRING(64), allowNull: true },
  investment_amount_needed: { type: DataTypes.STRING(64), allowNull: true },
  use_of_funds: { type: DataTypes.TEXT, allowNull: true },
  
  // Social Impact
  social_mission: { type: DataTypes.TEXT, allowNull: true },
  impact_metrics: { type: DataTypes.TEXT, allowNull: true },
  
  // Compliance
  regulatory_compliance: { type: DataTypes.STRING(128), allowNull: true },
  data_privacy_compliance: { type: DataTypes.STRING(128), allowNull: true },
  
  // Contact preferences
  preferred_contact_method: { type: DataTypes.STRING(64), allowNull: true },
  best_time_to_contact: { type: DataTypes.STRING(128), allowNull: true },
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

