const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.waitForLoadState('networkidle');
  const title = await page.title();
  console.log('Page title:', title);
  const usernameExists = await page.locator('[name="username"]').count() > 0;
  console.log('Username input exists:', usernameExists);
  if (usernameExists) {
    const isVisible = await page.locator('[name="username"]').isVisible();
    console.log('Username input visible:', isVisible);
  }
  await browser.close();
})();