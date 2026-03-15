const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const fs = require('fs');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../testdata/loginData');
const logger = require('../utils/logger');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test.afterEach(async () => {
    const logPath = 'logs/test.log';
    if (fs.existsSync(logPath)) {
      const logContent = fs.readFileSync(logPath, 'utf8');
      allure.attachment('Test Log', logContent, 'text/plain');
    }
  });

  test('Verify Login with valid credentials', async () => {
    logger.info("Starting Login Test");

    await test.step("Login with valid credentials", async () => {
      await loginPage.login(loginData.username, loginData.password);
    });

  });
});