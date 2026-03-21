/**
 * Logger Configuration Module
 *
 * This module sets up Winston logging for the Playwright test framework.
 * It provides structured logging to both console and file outputs with timestamps.
 * Logging is essential for debugging test execution, tracking test flow, and generating
 * reports with detailed execution information.
 *
 * Log Levels: error, warn, info, debug (currently set to 'info')
 * Outputs:
 * - Console: Real-time logging during test execution
 * - File: Persistent log file for post-execution analysis and Allure report attachments
 *
 * Dependencies:
 * - winston: Powerful logging library with multiple transports and formats
 */

// Import Winston logging components
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logsDir = path.resolve(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const sharedLogPath = path.join(logsDir, 'test.log');

const consoleTransport = new transports.Console();
const fileTransport = new transports.File({ filename: sharedLogPath });

// Create and configure the logger instance
const logger = createLogger({
  // Set minimum log level to 'info' (logs info, warn, and error messages)
  // Change to 'debug' for more detailed logging during development
  level: 'info',

  // Define log format with timestamp and custom message structure
  format: format.combine(
    // Add timestamp to each log entry
    format.timestamp(),
    // Custom format: "timestamp [level] : message"
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),

  // Define output destinations (transports)
  transports: [
    // Console transport for real-time logging during test execution
    consoleTransport,

    // File transport to save logs for persistence and reporting
    fileTransport
  ]
});

logger.setTestLogFile = (filename) => {
  const resolvedPath = path.resolve(filename);
  const targetDir = path.dirname(resolvedPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fileTransport.filename = resolvedPath;
  fileTransport.dirname = targetDir;
  fileTransport._basename = path.basename(resolvedPath);
  fileTransport.open();
};

logger.resetTestLogFile = () => {
  fileTransport.filename = sharedLogPath;
  fileTransport.dirname = path.dirname(sharedLogPath);
  fileTransport._basename = path.basename(sharedLogPath);
  fileTransport.open();
};

// Export the configured logger instance for use across the framework
module.exports = logger;
