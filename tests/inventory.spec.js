/**
 * Inventory Test Suite
 *
 * This test suite contains all tests related to the inventory/product functionality of the SauceDemo application.
 * It focuses on post-login scenarios where users interact with products, add items to cart, etc.
 * The suite uses both LoginPage and InventoryPage objects following the Page Object Model pattern.
 *
 * Features tested:
 * - Product listing visibility
 * - Product selection and navigation
 * - Add to cart functionality
 *
 * Dependencies:
 * - LoginPage: For authentication before inventory tests
 * - InventoryPage: Page object for inventory interactions
 * - loginData: Test data for login credentials
 * - Logger: For logging test steps
 * - Allure: For test reporting and attachments
 */

const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const fs = require('fs');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const loginData = require('../testdata/loginData');
const logger = require('../utils/logger');

test.describe('Inventory Tests', () => {
  let loginPage;
  let inventoryPage;

  // Set Allure suite for better reporting organization
  test.beforeAll(() => {
    allure.suite('Product Management Suite');
  });

  /**
   * Setup method executed before each test in this suite.
   * Initializes both LoginPage and InventoryPage instances, then performs login.
   * This ensures each inventory test starts from an authenticated state on the inventory page.
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Login once before each inventory test
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.username, loginData.password);
  });

  /**
   * Teardown method executed after each test in this suite.
   * Attaches the test log file to the Allure report for debugging purposes.
   * This helps in analyzing test failures and understanding test execution flow.
   */
  test.afterEach(async () => {
    const logPath = 'logs/test.log';
    if (fs.existsSync(logPath)) {
      const logContent = fs.readFileSync(logPath, 'utf8');
      allure.attachment('Test Log', logContent, 'text/plain');
    }
  });

  /**
   * Test Case: Complete Inventory User Journey - Login to Add Product to Cart
   *
   * Description: This test verifies the complete user journey from login through product selection
   * and cart addition. It covers the full e-commerce flow: authentication, product browsing,
   * product details navigation, and cart management.
   *
   * Steps:
   * 1. Login with valid credentials (handled in beforeEach)
   * 2. Verify that the "Products" title is visible on the inventory page
   * 3. Click on "Sauce Labs Bolt T-Shirt" product name to navigate to details
   * 4. Wait for the product detail page to load completely
   * 5. Click "Add to cart" button on the product detail page
   * 6. Verify cart badge updates to show "1" item in cart
   *
   * Expected Result: User successfully completes the full shopping flow and cart is updated
   */
  test('Complete Inventory Flow: Login → Browse → Select Product → Add to Cart', async ({ page }) => {
    logger.info('Starting complete inventory user journey test');

    // Step 1: Verify we're on the inventory page after login
    await test.step("Verify Products title is visible", async () => {
      await inventoryPage.verifyProductsVisible();
    });

    // Step 2: Click on the product to navigate to detail page
    await test.step("Click on Sauce Labs Bolt T-Shirt product", async () => {
      await inventoryPage.clickProduct('Sauce Labs Bolt T-Shirt');
    });

    // Step 3: Wait for the product detail page to load
    await test.step("Wait for product detail page to load", async () => {
      await page.waitForLoadState('networkidle');
    });

    // Step 4: Add the product to cart
    await test.step("Add product to cart", async () => {
      await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    });

    // Step 5: Verify cart badge shows the item was added
    await test.step("Verify cart badge shows 1 item", async () => {
      const cartBadge = page.locator('.shopping_cart_badge');
      await expect(cartBadge).toHaveText('1');
    });

    logger.info('Completed complete inventory user journey test');
  });
});
