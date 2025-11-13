const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { errorResponse } = require('../utils/response');

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (decoded.type !== 'admin') {
      return errorResponse(res, 'Access denied. Admin token required.', 403);
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid token.', 401);
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // Verify token is for user (not admin)
    if (decoded.type === 'admin') {
      return errorResponse(res, 'Access denied. User token required.', 403);
    }
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token.', 401);
  }
};

module.exports = {
  authenticateAdmin,
  authenticateUser
};