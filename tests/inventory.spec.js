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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Login once before each inventory test
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.username, loginData.password);
  });

  test.afterEach(async () => {
    const logPath = 'logs/test.log';
    if (fs.existsSync(logPath)) {
      const logContent = fs.readFileSync(logPath, 'utf8');
      allure.attachment('Test Log', logContent, 'text/plain');
    }
  });

  test('Verify Products title is visible', async () => {
    logger.info('Verifying Products title');
    await inventoryPage.verifyProductsVisible();
  });

  test('Add Sauce Labs Bolt T-Shirt to cart', async ({ page }) => {
    logger.info('Adding Sauce Labs Bolt T-Shirt to cart');

    await inventoryPage.verifyProductsVisible();

    await inventoryPage.clickProduct('Sauce Labs Bolt T-Shirt');
    
    await page.waitForLoadState('networkidle');

    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Verify cart badge updated
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
});
