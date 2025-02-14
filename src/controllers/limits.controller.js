// src/controllers/limits.controller.js (Limits Controller)
const axios = require("axios");
const logger = require("../utils/logger");
const { BASE_URL } = require("../config");
const { ApiError } = require("../middlewares/error.middleware");
const { generateHeaders } = require("../utils/request-helpers");

// Get Limits
exports.getLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    const response = await axios.get(
      `${BASE_URL}/v1/institutions/${rtn}/environments/${env}/products/fasterpayments/limits`,
      { headers: generateHeaders(req.token) }
    );

    res.json(response.data);
  } catch (error) {
    return next(new ApiError(400, "BadRequest", [{ code: "PA-1015", description: "Invalid PaymentNetwork or Identifier" }]));
  }
};

// Add Limits
exports.addLimits = async (req, res, next) => {
  try {
    const { rtn, env } = req.params;
    const response = await axios.post(
      `${BASE_URL}/v1/institutions/${rtn}/environments/${env}/products/fasterpayments/limits`,
      req.body,
      { headers: generateHeaders(req.token) }
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
    const response = await axios.put(
      `${BASE_URL}/v1/institutions/${rtn}/environments/${env}/products/fasterpayments/limits`,
      req.body,
      { headers: generateHeaders(req.token) }
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
    await axios.delete(
      `${BASE_URL}/v1/institutions/${rtn}/environments/${env}/products/fasterpayments/limits`,
      { headers: generateHeaders(req.token), data: req.body }
    );

    res.status(204).send();
  } catch (error) {
    return next(new ApiError(400, "BadRequest", [{ code: "PA-1025", description: "Invalid limit range" }]));
  }
};
