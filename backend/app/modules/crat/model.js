import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../backend/config/database.js';

export const CratAssessment = sequelize.define('crat_assessments', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  project_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  created_by: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  status: { type: DataTypes.ENUM('in_progress','submitted','scored'), defaultValue: 'in_progress' },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

export const CratDomain = sequelize.define('crat_domains', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: false });

export const CratQuestion = sequelize.define('crat_questions', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  domain_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  section_title: { type: DataTypes.STRING(191), allowNull: false },
  sub_domain: { type: DataTypes.STRING(191), allowNull: false },
  question_text: { type: DataTypes.STRING(512), allowNull: false },
  attach_hint: { type: DataTypes.STRING(255) },
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: false });

export const CratAnswer = sequelize.define('crat_answers', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  assessment_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  question_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  rating: { type: DataTypes.ENUM('yes','maybe','no'), allowNull: true },
  score: { type: DataTypes.TINYINT.UNSIGNED, allowNull: true },
  attachment_name: { type: DataTypes.STRING(255), allowNull: true },
  attachment_url: { type: DataTypes.STRING(512), allowNull: true },
}, { timestamps: true, createdAt: false, updatedAt: 'updated_at', indexes: [{ unique: true, fields: ['assessment_id','question_id'] }] });

export const CratDomainScore = sequelize.define('crat_domain_scores', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  assessment_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  domain_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  actual_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  target_score: { type: DataTypes.INTEGER, defaultValue: 0 },
  readiness_pct: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.00 },
}, { timestamps: false, indexes: [{ unique: true, fields: ['assessment_id','domain_id'] }] });

CratDomain.hasMany(CratQuestion, { foreignKey: 'domain_id', as: 'questions' });
CratQuestion.belongsTo(CratDomain, { foreignKey: 'domain_id' });

export default { CratAssessment, CratDomain, CratQuestion, CratAnswer, CratDomainScore };





