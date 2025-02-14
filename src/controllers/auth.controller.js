// src/controllers/auth.controller.js (Auth Controller)
const axios = require("axios");
const logger = require("../utils/logger");
const { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET } = require("../config");
const { ApiError } = require("../middlewares/error.middleware");

exports.generateToken = async (req, res, next) => {
  try {
    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
    const response = await axios.post(`${BASE_URL}/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const errorMessage = error.response?.data || "Failed to generate token";

    return next(new ApiError(status, "Authentication Error", [{ code: "AUTH-001", description: errorMessage }]));
  }
};
