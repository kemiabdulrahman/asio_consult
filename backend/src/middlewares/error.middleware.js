const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return errorResponse(res, 'Validation Error', 400, errors);
  }

  if (err.code === 'P2002') {
    return errorResponse(res, 'Duplicate entry found', 400);
  }

  return errorResponse(res, 'Internal Server Error', 500);
};

module.exports = errorHandler;