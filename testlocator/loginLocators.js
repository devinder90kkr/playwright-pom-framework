/**
 * Login Page Locators
 *
 * This file contains all locator definitions for elements on the SauceDemo login page.
 * Using XPath locators for precise element identification based on id attributes.
 * Centralizing locators here improves maintainability and reusability across the framework.
 *
 * Locator Strategy:
 * - XPath is used for reliable element location using id attributes
 * - These locators are used by the LoginPage class in the Page Object Model
 */

// Export an object containing all login page element locators
module.exports = {
  // Locator for the username input field
  // Uses XPath to find input element with id="user-name"
  usernameInput: '//input[@id="user-name"]',

  // Locator for the password input field
  // Uses XPath to find input element with id="password"
  passwordInput: '//input[@id="password"]',

  // Locator for the login button
  // Uses XPath to find input element with id="login-button"
  loginButton: '//input[@id="login-button"]'
};