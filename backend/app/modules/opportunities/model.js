import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export const Opportunity = sequelize.define('Opportunity', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Funding Round', 'Partnership', 'Investment', 'Acquisition', 'Merger'),
    allowNull: false
  },
  industry: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  postedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  image: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closing Soon', 'Closed'),
    allowNull: false,
    defaultValue: 'Open'
  },
  amount: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  stage: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  equity: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  investors: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'opportunities',
  timestamps: false
});