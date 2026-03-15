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
const { createLogger, format, transports } = require('winston');

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
    new transports.Console(),

    // File transport to save logs to 'logs/test.log' for persistence and reporting
    new transports.File({ filename: 'logs/test.log' })
  ]
});

// Export the configured logger instance for use across the framework
module.exports = logger;