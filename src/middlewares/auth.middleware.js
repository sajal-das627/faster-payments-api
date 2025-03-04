// src/middlewares/auth.middleware.js (Auth Middleware)
/*exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.token = token.split(" ")[1];
    next();
  };*/

const axios = require("axios");
const logger = require("../utils/logger");
const { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET } = require("../config");

let accessToken = null;
let tokenExpiry = 0;

/**
 * Fetch a new OAuth token if expired.
 */
const getAccessToken = async () => {
  try {
    // If the token is still valid, return it
    if (accessToken && Date.now() < tokenExpiry) {
      return accessToken;
    }

    // Generate new token
    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
    const response = await axios.post(`${BASE_URL}/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Store token and expiry time
    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000 - 5000; // 5 sec buffer

    logger.info("🔑 New access token acquired.");
    return accessToken;
  } catch (error) {
    logger.error("❌ Error fetching access token:", error.response?.data || error.message);
    throw new Error("Authentication Failed: Unable to get access token");
  }
};

/**
 * Middleware to automatically add access_token to request.
 */
const authenticate = async (req, res, next) => {
  try {
    req.token = await getAccessToken();
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized", message: "Failed to authenticate" });
  }
};

module.exports = { authenticate };

  