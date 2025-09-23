import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

export const Program = sequelize.define('Program', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  enrolled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  closed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  industry: {
    type: DataTypes.STRING(128),
    allowNull: false
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
  tableName: 'programs',
  timestamps: false
});

export const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  industry: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tags: {
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
  tableName: 'lessons',
  timestamps: false
});