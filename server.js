// server.js (Server Entry Point)
const app = require("./app");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
