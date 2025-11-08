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
    req.admin = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid token.', 401);
  }
};

module.exports = {
  authenticateAdmin
};