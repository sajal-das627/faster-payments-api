const { v4: uuidv4 } = require("uuid");

/**
 * Generate headers for JH PayCenter Faster Payments API requests.
 * @param {string} token - Bearer token for authentication.
 * @returns {object} - Headers object.
 */
const generateHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Request-ID": uuidv4(),
    "X-Correlation-ID": uuidv4(),
    "X-AuditUserId": "admin",
    PaymentNetwork: "Zelle",
    LimitScope: "User",
    Direction: "Outbound",
    Identifier: "user@example.com",
  };
};

module.exports = { generateHeaders };
