const { expect } = require('@playwright/test');
const inventoryLocators = require('../testlocator/inventoryLocators');
const logger = require('../utils/logger');

class InventoryPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.productsTitle = page.locator(inventoryLocators.productsTitle);
    this.addToCartButton = page.locator(inventoryLocators.addToCartButton);
  }

  async verifyProductsVisible() {
    logger.info('Verifying Products title is visible');
    await expect(this.productsTitle).toBeVisible();
  }

  async clickProduct(productName) {
    logger.info(`Clicking product: ${productName}`);
    const productCard = this.page.locator(inventoryLocators.productCard(productName));
    await productCard.locator('.inventory_item_name').click();
  }

  async verifyBackToProductsVisible() {
    logger.info('Verifying Back to products button is visible');
    await expect(this.page.locator(inventoryLocators.backToProducts)).toBeVisible();
  }

  async addProductToCart(productName) {
    logger.info(`Adding product to cart: ${productName}`);
    await this.addToCartButton.click();
  }
}

module.exports = InventoryPage;
