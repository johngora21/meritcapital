import { Program, Lesson } from './model.js';
import httpLogger from '../../core/utils/logger.js';
import { Op } from 'sequelize';

// Get all programs
const getPrograms = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', industry = '' } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { organization: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (industry && industry !== 'All Industries') {
      whereClause.industry = industry;
    }

    const { count, rows: programs } = await Program.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: programs,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    httpLogger.error('Error fetching programs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch programs'
    });
  }
};

// Get all lessons
const getLessons = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', industry = '' } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { instructor: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (industry && industry !== 'All Industries') {
      whereClause.industry = industry;
    }

    const { count, rows: lessons } = await Lesson.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: lessons,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    httpLogger.error('Error fetching lessons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lessons'
    });
  }
};

// Create new program
const createProgram = async (req, res) => {
  try {
    const programData = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };

    const program = await Program.create(programData);

    res.status(201).json({
      success: true,
      data: program,
      message: 'Program created successfully'
    });
  } catch (error) {
    httpLogger.error('Error creating program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create program'
    });
  }
};

// Create new lesson
const createLesson = async (req, res) => {
  try {
    const lessonData = {
      ...req.body,
      views: 0,
      created_at: new Date(),
      updated_at: new Date()
    };

    const lesson = await Lesson.create(lessonData);

    res.status(201).json({
      success: true,
      data: lesson,
      message: 'Lesson created successfully'
    });
  } catch (error) {
    httpLogger.error('Error creating lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lesson'
    });
  }
};

// Update program
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    await program.update({
      ...req.body,
      updated_at: new Date()
    });

    res.json({
      success: true,
      data: program,
      message: 'Program updated successfully'
    });
  } catch (error) {
    httpLogger.error('Error updating program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update program'
    });
  }
};

// Update lesson
const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    await lesson.update({
      ...req.body,
      updated_at: new Date()
    });

    res.json({
      success: true,
      data: lesson,
      message: 'Lesson updated successfully'
    });
  } catch (error) {
    httpLogger.error('Error updating lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lesson'
    });
  }
};

// Delete program
const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    await program.destroy();

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    httpLogger.error('Error deleting program:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete program'
    });
  }
};

// Delete lesson
const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    await lesson.destroy();

    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    httpLogger.error('Error deleting lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lesson'
    });
  }
};

export {
  getPrograms,
  getLessons,
  createProgram,
  createLesson,
  updateProgram,
  updateLesson,
  deleteProgram,
  deleteLesson
};