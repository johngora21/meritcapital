import { Opportunity } from './model.js';
import { env } from '../../../config/env.js';
// Use console for error logging in controllers
import { Op } from 'sequelize';

// Get all opportunities
const getOpportunities = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', industry = '', type = '', stage = '' } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (industry) {
      whereClause.industry = industry;
    }
    
    if (type) {
      whereClause.type = type;
    }
    
    if (stage) {
      whereClause.stage = stage;
    }

    const { count, rows: opportunities } = await Opportunity.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: opportunities,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunities'
    });
  }
};

// Create new opportunity
const createOpportunity = async (req, res) => {
  try {
    const opportunityData = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };

    const opportunity = await Opportunity.create(opportunityData);

    res.status(201).json({
      success: true,
      data: opportunity,
      message: 'Opportunity created successfully'
    });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    const devDetails = env.nodeEnv === 'development' ? {
      error: String(error?.message || error),
      details: error?.errors || error?.parent?.sqlMessage || undefined
    } : {};
    res.status(400).json({
      success: false,
      message: 'Failed to create opportunity',
      ...devDetails
    });
  }
};

// Update opportunity
const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findByPk(id);
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    await opportunity.update({
      ...req.body,
      updated_at: new Date()
    });

    res.json({
      success: true,
      data: opportunity,
      message: 'Opportunity updated successfully'
    });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update opportunity'
    });
  }
};

// Delete opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findByPk(id);
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    await opportunity.destroy();

    res.json({
      success: true,
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete opportunity'
    });
  }
};

export {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};