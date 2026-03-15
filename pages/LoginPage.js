// Import configuration and locator files
const { expect } = require('@playwright/test');
const config = require('../utils/config');
const logger = require('../utils/logger');
const loginLocators = require('../testlocator/loginLocators');
/**
 * Page Object Model for Login Page
 */
class LoginPage {

constructor(page){
  this.page = page;

  // Define page elements using Playwright locators from testlocator
  this.usernameInput = page.locator(loginLocators.usernameInput);
  this.passwordInput = page.locator(loginLocators.passwordInput);
  this.loginButton = page.locator(loginLocators.loginButton);
}

/**
 * Navigate to Login Page
 */
async navigateToLoginPage(){

logger.info("Navigating to Login Page");
 // Open application URL
await this.page.goto(config.baseURL);

await this.usernameInput.waitFor({ state: 'visible' });

logger.info("Login page loaded successfully");

}

/**
 * Perform login action
 * @param {string} username
 * @param {string} password
 */
async login(username,password){

    logger.info("Entering username");

    await this.usernameInput.fill(username);

    logger.info("Entering password");

    await this.passwordInput.fill(password);

    logger.info("Clicking Login button");
    await this.loginButton.click();
  }

}

module.exports = LoginPage;