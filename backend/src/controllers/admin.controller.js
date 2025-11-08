const AdminService = require('../services/admin.service');
const { successResponse, errorResponse } = require('../utils/response');

class AdminController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      const result = await AdminService.login(email, password);
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  }

  async getDashboardStats(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      return successResponse(res, stats, 'Dashboard stats retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async createAdmin(req, res) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return errorResponse(res, 'Email, password, and name are required', 400);
      }

      const admin = await AdminService.createAdmin({ email, password, name });
      return successResponse(res, { 
        id: admin.id, 
        email: admin.email, 
        name: admin.name 
      }, 'Admin created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new AdminController();