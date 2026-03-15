// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  // Increase global timeout to avoid Jenkins timeout failures
  timeout: 60000,

  // Reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 30000,

    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

});