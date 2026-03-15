/**
 * Application Configuration Module
 *
 * This module centralizes all configuration settings for the Playwright test framework.
 * It loads environment variables from a .env file and provides default values as fallbacks.
 * This approach allows for easy configuration management across different environments
 * (development, staging, production) without modifying code.
 *
 * Environment Variables:
 * - BASE_URL: The base URL of the application under test
 *
 * Dependencies:
 * - dotenv: Loads environment variables from .env file
 */

// Load environment variables from .env file into process.env
require('dotenv').config();

// Export configuration object with application settings
module.exports = {
  // Base URL for the application under test
  // Falls back to SauceDemo default if not specified in environment
  baseURL: process.env.BASE_URL || "https://www.saucedemo.com/"
};