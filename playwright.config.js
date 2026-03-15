// @ts-check
/**
 * Playwright Configuration File
 *
 * This file contains the complete configuration for the Playwright test framework.
 * It defines test execution settings, browser configurations, reporting options,
 * and global test behaviors for the SauceDemo e-commerce application testing.
 *
 * Key Configurations:
 * - Test directory and parallel execution settings
 * - Allure reporting for detailed test reports
 * - Multi-browser testing (Chromium, Firefox, WebKit)
 * - Screenshot and trace collection on failures
 * - Base URL configuration from environment variables
 */

const { defineConfig, devices } = require('@playwright/test');

/**
 * Load environment variables from .env file for configuration
 * This allows different settings for different environments (dev, staging, prod)
 */
require('dotenv').config();

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Directory containing test files
  testDir: './tests',

  // Run tests in files in parallel for faster execution
  fullyParallel: true,

  // Prevent accidental commits of test.only in CI environments
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI (2 retries), no retries locally for faster feedback
  retries: process.env.CI ? 2 : 0,

  // Use single worker in CI to avoid resource conflicts, parallel locally
  workers: process.env.CI ? 1 : undefined,

  // Test reporters: Allure for detailed HTML reports with history and trends
  reporter: [['allure-playwright']],

  /* Global test options shared across all projects */
  use: {
    // Base URL for all page.goto() calls - loaded from environment or default to SauceDemo
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Collect traces on test retries for debugging failed tests
    trace: 'on',

    // Capture screenshots only when tests fail for efficient storage
    screenshot: 'only-on-failure',

    // Timeout for individual actions (10 seconds) to prevent hanging tests
    actionTimeout: 10000,
  },

  /* Browser configuration projects */
  projects: [
    {
      // Chromium-based browser testing (Chrome, Edge, etc.)
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      // Firefox browser testing
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      // WebKit/Safari browser testing
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Mobile viewport testing (commented out - can be enabled if needed) */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Branded browser testing (commented out - can be enabled if needed) */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Local development server configuration (uncomment if testing local app) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

