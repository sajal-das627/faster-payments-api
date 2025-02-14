// src/utils/logger.js (Logger Setup)
const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console(), new transports.File({ filename: "logs.log" })],
});

module.exports = logger;
