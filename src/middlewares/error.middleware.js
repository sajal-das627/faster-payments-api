const logger = require("../utils/logger");

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  // Default Error Response Structure
  const errorResponse = {
    responseCode: err.statusCode || 500,
    description: err.message || "Internal Server Error",
    messageSource: "PayCenter API",
    details: err.details || [],
  };

  res.status(errorResponse.responseCode).json(errorResponse);
};

// Custom error class for structured responses
class ApiError extends Error {
  constructor(statusCode, message, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = { errorHandler, ApiError };
