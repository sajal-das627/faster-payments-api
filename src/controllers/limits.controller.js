// src/controllers/limits.controller.js (Limits Controller)
const axios = require("axios");
/*const { v4: uuidv4 } = require("uuid");*/
const logger = require("../utils/logger");
const { BASE_URL } = require("../config");
const { ApiError } = require("../middlewares/error.middleware");
const { generateHeaders } = require("../utils/request-helpers");

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
    logger.error("Error fetching limits:", error.response?.data || error.message);

    if (error.response?.status === 400) {
      return next(new ApiError(400, "BadRequest", [
        { code: "PA-1015", description: "Invalid PaymentNetwork or Identifier" }
      ]));
    }

    /*if (error.code === "ECONNABORTED") {
      return next(new ApiError(504, "Gateway Timeout", [{ code: "TIMEOUT-001", description: "API request timed out" }]));
    }*/

    return next(new ApiError(500, "Internal Server Error", [
      { code: "SERVER-001", description: "Unexpected error while fetching limits" }
    ]));
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
    return next(new ApiError(400, "BadRequest", [{ code: "PA-1003", description: "Identifier is required" }]));
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
    return next(new ApiError(400, "BadRequest", [{ code: "PA-1011", description: "Limit range is invalid" }]));
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
    return next(new ApiError(400, "BadRequest", [{ code: "PA-1025", description: "Invalid limit range" }]));
  }
};
