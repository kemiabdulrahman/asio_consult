const UserService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/response');

class UserController {
  /**
   * POST /api/users/register
   * Register a new user
   */
  static async register(req, res) {
    try {
      const { email, password, name, phone } = req.body;

      if (!email || !password || !name) {
        return errorResponse(res, 'Email, password, and name are required', 400);
      }

      // Password validation
      if (password.length < 6) {
        return errorResponse(res, 'Password must be at least 6 characters', 400);
      }

      const result = await UserService.registerUser({
        email,
        password,
        name,
        phone
      });

      return successResponse(res, 'User registered successfully', result, 201);
    } catch (error) {
      console.error('Register error:', error);

      if (error.message.includes('already exists')) {
        return errorResponse(res, 'User with this email already exists', 409);
      }

      return errorResponse(res, error.message || 'Failed to register user', 500);
    }
  }

  /**
   * POST /api/users/login
   * Login user
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      const result = await UserService.loginUser(email, password);

      return successResponse(res, 'User logged in successfully', result, 200);
    } catch (error) {
      console.error('Login error:', error);

      if (error.message.includes('Invalid')) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      return errorResponse(res, error.message || 'Failed to login', 500);
    }
  }

  /**
   * GET /api/users/profile
   * Get current user profile (requires auth)
   */
  static async getProfile(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return errorResponse(res, 'Unauthorized', 401);
      }

      const user = await UserService.getUserById(userId);

      return successResponse(res, 'User profile retrieved', user, 200);
    } catch (error) {
      console.error('Get profile error:', error);

      if (error.message === 'User not found') {
        return errorResponse(res, 'User not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to get profile', 500);
    }
  }

  /**
   * PUT /api/users/profile
   * Update user profile (requires auth)
   */
  static async updateProfile(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return errorResponse(res, 'Unauthorized', 401);
      }

      const updatedUser = await UserService.updateUserProfile(userId, req.body);

      return successResponse(res, 'User profile updated successfully', updatedUser, 200);
    } catch (error) {
      console.error('Update profile error:', error);

      if (error.message === 'User not found') {
        return errorResponse(res, 'User not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to update profile', 500);
    }
  }

  /**
   * POST /api/users/change-password
   * Change user password (requires auth)
   */
  static async changePassword(req, res) {
    try {
      const userId = req.user?.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!userId) {
        return errorResponse(res, 'Unauthorized', 401);
      }

      if (!oldPassword || !newPassword || !confirmPassword) {
        return errorResponse(res, 'All password fields are required', 400);
      }

      if (newPassword !== confirmPassword) {
        return errorResponse(res, 'New passwords do not match', 400);
      }

      if (newPassword.length < 6) {
        return errorResponse(res, 'New password must be at least 6 characters', 400);
      }

      const result = await UserService.changePassword(userId, oldPassword, newPassword);

      return successResponse(res, result.message, null, 200);
    } catch (error) {
      console.error('Change password error:', error);

      if (error.message.includes('not found')) {
        return errorResponse(res, 'User not found', 404);
      }

      if (error.message.includes('incorrect')) {
        return errorResponse(res, error.message, 401);
      }

      return errorResponse(res, error.message || 'Failed to change password', 500);
    }
  }

  /**
   * GET /api/users/:id
   * Get user by ID (admin only)
   */
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(id);

      return successResponse(res, 'User retrieved', user, 200);
    } catch (error) {
      console.error('Get user error:', error);

      if (error.message === 'User not found') {
        return errorResponse(res, 'User not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to get user', 500);
    }
  }
}

module.exports = UserController;
