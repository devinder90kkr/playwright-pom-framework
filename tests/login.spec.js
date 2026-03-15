/**
 * Login Test Suite
 *
 * This test suite contains all tests related to the login functionality of the SauceDemo application.
 * It uses the Page Object Model (POM) pattern with the LoginPage class to interact with login elements.
 * The suite includes setup and teardown methods to ensure a clean state for each test.
 *
 * Features tested:
 * - Valid login with correct credentials
 *
 * Dependencies:
 * - LoginPage: Page object for login interactions
 * - loginData: Test data for username and password
 * - Logger: For logging test steps
 * - Allure: For test reporting and attachments
 */

const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const fs = require('fs');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../testdata/loginData');
const logger = require('../utils/logger');

test.describe('Login Tests', () => {
  let loginPage;

  // Set Allure suite for better reporting organization
  test.beforeAll(() => {
    allure.suite('Authentication Suite');
  });

  /**
   * Setup method executed before each test in this suite.
   * Initializes the LoginPage instance and navigates to the login page.
   * This ensures each test starts from a clean login page state.
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  // /**
  //  * Teardown method executed after each test in this suite.
  //  * Attaches the test log file to the Allure report for debugging purposes.
  //  * This helps in analyzing test failures and understanding test execution flow.
  //  */
  // test.afterEach(async () => {
  //   const logPath = 'logs/test.log';
  //   if (fs.existsSync(logPath)) {
  //     const logContent = fs.readFileSync(logPath, 'text/plain');
  //     allure.attachment('Test Log', logContent, 'text/plain');
  //   }
  // });

  /**
   * Test Case: Verify Login with valid credentials
   *
   * Description: This test verifies that a user can successfully log in to the SauceDemo application
   * using valid credentials. It checks the complete login flow from entering credentials to
   * being redirected to the inventory page.
   *
   * Steps:
   * 1. Navigate to login page (handled in beforeEach)
   * 2. Enter valid username and password
   * 3. Click login button
   * 4. Verify successful login by checking URL or dashboard elements
   *
   * Expected Result: User should be logged in and redirected to inventory page
   */
  test('Verify Login with valid credentials', async () => {
    logger.info("Starting Login Test");

    await test.step("Login with valid credentials", async () => {
      await loginPage.login(loginData.username, loginData.password);
    });

  });
});