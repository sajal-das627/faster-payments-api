// src/controllers/limits.controller.js (Limits Controller)
const axios = require("axios");
/*const { v4: uuidv4 } = require("uuid");*/
const logger = require("../utils/logger");
const { BASE_URL } = require("../config");
const { ApiError } = require("../middlewares/error.middleware");
const { generateHeaders } = require("../utils/request-helpers");

/**
 * Handles API errors and maps them to PayCenter error codes.
 */
const handleApiError = (error, next) => {
  logger.error("Error calling PayCenter API:", error.response?.data || error.message);

  if (error.response) {
    const status = error.response.status;
    const errorMessage = error.response.data?.description || "Unknown error";

    let errorDetails;
    switch (status) {
      case 400:
        errorDetails = [
          { code: "PA-1015", description: "Bad request - missing or invalid parameters" },
        ];
        break;
      case 404:
        errorDetails = [
          { code: "PA-1003", description: "Resource not found" },
        ];
        break;
      case 409:
        errorDetails = [
          { code: "PA-9998", description: "Conflict Error - Limit already exists" },
        ];
        break;
      case 500:
        errorDetails = [
          { code: "PA-9999", description: "Internal Server Error - Unexpected failure" },
        ];
        break;
      default:
        errorDetails = [{ code: "PA-9999", description: "Unhandled API error" }];
    }

    return next(new ApiError(status, errorMessage, errorDetails));
  }

  return next(new ApiError(500, "Internal Server Error", [
    { code: "PA-9999", description: "Unexpected error while processing request" }
  ]));
};

// Get Limits
exports.getLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    
    // Ensure Authorization Header Exists
    if (!req.token) {
      throw new ApiError(401, "Unauthorized", [{ code: "AUTH-002", description: "Missing access token" }]);
    }

    /*const headers = {
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
      "X-Request-ID": uuidv4(),
      "X-Correlation-ID": uuidv4(),
      "X-AuditUserId": "admin",
      PaymentNetwork: "Zelle",
      LimitScope: "User",
      Direction: "Outbound",
      Identifier: "cutexaslimittest1@jackhenry.com",
    };*/

    const response = await axios.get(
      `${BASE_URL}/api/v1/institutions/${rtn}/environments/${env}/products/faster-payments/limits`,
      { headers: generateHeaders(req.token), timeout: 60000 }
      /*{ headers, timeout: 60000 }*/
    );

    res.json(response.data);
  } catch (error) {
    return handleApiError(error, next);
  }
};

// Add Limits
exports.addLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    /*const headers = {
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
      "X-Request-ID": uuidv4(),
      "X-Correlation-ID": uuidv4(),
      "X-AuditUserId": "admin",
      PaymentNetwork: "Zelle",
      LimitScope: "User",
      Direction: "Outbound",
      Identifier: "cutexaslimittest1@jackhenry.com",
    };*/
    const response = await axios.post(
      `${BASE_URL}/api/v1/institutions/${rtn}/environments/${env}/products/faster-payments/limits`,
      req.body,
      { headers: generateHeaders(req.token), timeout: 60000 }
      /*{ headers, timeout: 60000 }*/
    );

    res.json(response.data);
  } catch (error) {
    return handleApiError(error, next);
  }
};

// Update Limits
exports.updateLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    /*const headers = {
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
      "X-Request-ID": uuidv4(),
      "X-Correlation-ID": uuidv4(),
      "X-AuditUserId": "admin",
      PaymentNetwork: "Zelle",
      LimitScope: "User",
      Direction: "Outbound",
      Identifier: "cutexaslimittest1@jackhenry.com",
    };*/
    const response = await axios.put(
      `${BASE_URL}/api/v1/institutions/${rtn}/environments/${env}/products/faster-payments/limits`,
      req.body,
      { headers: generateHeaders(req.token), timeout: 60000 }
      /*{ headers, timeout: 60000 }*/
    );

    res.json(response.data);
  } catch (error) {
    return handleApiError(error, next);
  }
};

// Delete Limits
exports.deleteLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    /*const headers = {
      Authorization: `Bearer ${req.token}`,
      "Content-Type": "application/json",
      "X-Request-ID": uuidv4(),
      "X-Correlation-ID": uuidv4(),
      "X-AuditUserId": "admin",
      PaymentNetwork: "Zelle",
      LimitScope: "User",
      Direction: "Outbound",
      Identifier: "cutexaslimittest1@jackhenry.com",
    };*/
    await axios.delete(
      `${BASE_URL}/api/v1/institutions/${rtn}/environments/${env}/products/faster-payments/limits`,
      { headers: generateHeaders(req.token), data: req.body, timeout: 600}
      /*{ headers, data: req.body, timeout: 600}*/
    );

    res.status(204).send();
  } catch (error) {
    return handleApiError(error, next);
  }
};
