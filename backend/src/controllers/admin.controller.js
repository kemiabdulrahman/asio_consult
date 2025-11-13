const AdminService = require('../services/admin.service');
const { successResponse, errorResponse } = require('../utils/response');

class AdminController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      const result = await AdminService.login(email, password);
      return successResponse(res, 'Login successful', result, 200);
    } catch (error) {
      console.error('Admin login error:', error);
      return errorResponse(res, error.message || 'Login failed', 401);
    }
  }

  static async createAdmin(req, res) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return errorResponse(res, 'Email, password, and name are required', 400);
      }

      const admin = await AdminService.createAdmin({
        email,
        password,
        name
      });

      return successResponse(res, 'Admin created successfully', {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }, 201);
    } catch (error) {
      console.error('Create admin error:', error);

      if (error.message.includes('Unique constraint failed')) {
        return errorResponse(res, 'Email already exists', 400);
      }

      return errorResponse(res, error.message || 'Failed to create admin', 500);
    }
  }

  static async getDashboardStats(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      return successResponse(res, 'Dashboard stats retrieved', stats, 200);
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      return errorResponse(res, 'Failed to fetch dashboard stats', 500);
    }
  }
}

module.exports = AdminController;