/**
 * LoginPage Class - Page Object Model for SauceDemo Login Page
 *
 * This class encapsulates all interactions with the login page of the SauceDemo application.
 * It follows the Page Object Model (POM) design pattern to separate test logic from page-specific code.
 * All locators are imported from a centralized locator file for better maintainability.
 *
 * Key Features:
 * - Navigation to login page
 * - User authentication (username/password entry and login button click)
 * - Element waiting and verification
 *
 * Dependencies:
 * - config.js: Provides base URL for navigation
 * - logger.js: Handles logging for debugging and reporting
 * - loginLocators.js: Contains all locator definitions for login page elements
 */

// Import required modules and utilities
const { expect } = require('@playwright/test');
const config = require('../utils/config');
const logger = require('../utils/logger');
const loginLocators = require('../testlocator/loginLocators');

/**
 * Page Object Model for Login Page
 * Handles all login-related page interactions and verifications
 */
class LoginPage {
  /**
   * Constructor - Initialize the LoginPage object
   * @param {Page} page - Playwright page instance to interact with the browser
   */
  constructor(page) {
    this.page = page;

    // Define page elements using Playwright locators from centralized locator file
    // This approach separates locator definitions from page logic for easier maintenance
    this.usernameInput = page.locator(loginLocators.usernameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
  }

  /**
   * Navigate to the Login Page
   *
   * This method opens the application's base URL and waits for the login page to load completely.
   * It ensures that the username input field is visible before proceeding, confirming page readiness.
   *
   * Steps performed:
   * 1. Navigate to the base URL defined in config
   * 2. Wait for username input field to be visible (indicates page loaded)
   * 3. Log successful page load
   */
  async navigateToLoginPage() {
    logger.info("Navigating to Login Page");

    // Open the application URL from configuration
    await this.page.goto(config.baseURL);

    // Wait for the username input to be visible, ensuring page has loaded
    await this.usernameInput.waitFor({ state: 'visible' });

    logger.info("Login page loaded successfully");
  }

  /**
   * Perform Login Action
   *
   * This method handles the complete login process by filling in credentials and submitting the form.
   * It logs each step for debugging and reporting purposes.
   *
   * @param {string} username - The username to enter in the login form
   * @param {string} password - The password to enter in the login form
   *
   * Steps performed:
   * 1. Fill username input field
   * 2. Fill password input field
   * 3. Click login button to submit form
   * 4. Log each action for traceability
   */
  async login(username, password) {
    logger.info("Entering username");

    // Fill the username input field with provided username
    await this.usernameInput.fill(username);

    logger.info("Entering password");

    // Fill the password input field with provided password
    await this.passwordInput.fill(password);

    logger.info("Clicking Login button");

    // Click the login button to submit the form and attempt authentication
    await this.loginButton.click();
  }
}

module.exports = LoginPage;