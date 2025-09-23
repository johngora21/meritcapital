import { User } from '../users/model.js';
import { Project } from '../projects/model.js';
import { Investment } from '../investments/model.js';
import { Op } from 'sequelize';
import httpLogger from '../../core/utils/logger.js';

// Get admin dashboard statistics
const getStats = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      pendingProjects,
      totalInvestments,
      mentors,
      investors,
      entrepreneurs
    ] = await Promise.all([
      User.count(),
      User.count({ where: { is_active: true } }),
      Project.count({ where: { status: 'pending' } }),
      Investment.count(),
      User.count({ where: { role: 'mentor' } }),
      User.count({ where: { role: 'investor' } }),
      User.count({ where: { role: 'entrepreneur' } })
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        pendingProjects,
        totalInvestments,
        mentors,
        investors,
        entrepreneurs
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

// Get users with pagination, search, and filtering
const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      role = '',
      status = '',
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const whereClause = {};
    
    if (role && role !== 'all') {
      whereClause.role = role;
    }
    
    if (status && status !== 'all') {
      if (status === 'active') {
        whereClause.is_active = true;
      } else if (status === 'inactive') {
        whereClause.is_active = false;
      }
    }

    // Build search conditions
    const searchConditions = [];
    if (search) {
      searchConditions.push({
        [Op.or]: [
          { full_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } }
        ]
      });
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: {
        ...whereClause,
        ...(searchConditions.length > 0 ? { [Op.and]: searchConditions } : {})
      },
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset,
      attributes: ['id', 'email', 'full_name', 'role', 'is_active', 'created_at']
    });

    res.json({
      success: true,
      data: users,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// User management actions
const userAction = async (req, res) => {
  try {
    const { userId, action } = req.params;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    switch (action) {
      case 'approve':
        await user.update({ is_active: true });
        break;
      case 'suspend':
        await user.update({ is_active: false });
        break;
      case 'delete':
        await user.destroy();
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    res.json({
      success: true,
      message: `User ${action} successful`
    });
  } catch (error) {
    console.error('Error performing user action:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform action'
    });
  }
};

// Export user data
const exportUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'full_name', 'role', 'is_active', 'created_at'],
      order: [['created_at', 'DESC']]
    });

    // Convert to CSV format
    const csvHeader = 'ID,Email,Full Name,Role,Status,Created At\n';
    const csvData = users.map(user => 
      `${user.id},"${user.email}","${user.full_name}","${user.role}","${user.is_active ? 'Active' : 'Inactive'}","${user.created_at}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error('Error exporting users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export users'
    });
  }
};

export {
  getStats,
  getUsers,
  userAction,
  exportUsers
};
