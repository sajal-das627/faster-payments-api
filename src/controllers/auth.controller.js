const axios = require("axios");
const logger = require("../utils/logger");
const { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET } = require("../config");
const { ApiError } = require("../middlewares/error.middleware");

exports.generateToken = async (req, res, next) => {
  try {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      throw new ApiError(400, "Missing API Credentials", [
        { code: "AUTH-003", description: "Consumer Key or Secret is missing" }
      ]);
    }

    // Proper Base64 encoding
    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

    const response = await axios.post(`${BASE_URL}/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (error) {
    logger.error("Error generating token:", error.response?.data || error.message);
    
    return next(new ApiError(401, "Authentication Error", [
      { code: "AUTH-002", description: error.response?.data?.error_description || "Invalid client credentials" }
    ]));
  }
};
