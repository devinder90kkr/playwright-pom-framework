/**
 * InventoryPage Class - Page Object Model for SauceDemo Inventory/Product Page
 *
 * This class encapsulates all interactions with the inventory page of the SauceDemo application.
 * It handles product listing, product selection, and cart-related actions after successful login.
 * Following the Page Object Model pattern, it separates page logic from test logic.
 *
 * Key Features:
 * - Product title verification
 * - Product selection and navigation to detail pages
 * - Add to cart functionality
 * - Back to products navigation (for detail pages)
 *
 * Dependencies:
 * - inventoryLocators.js: Contains all locator definitions for inventory page elements
 * - logger.js: Handles logging for debugging and reporting
 */

// Import required modules and utilities
const { expect } = require('@playwright/test');
const inventoryLocators = require('../testlocator/inventoryLocators');
const logger = require('../utils/logger');

/**
 * Page Object Model for Inventory Page
 * Handles all inventory/product-related page interactions and verifications
 */
class InventoryPage {
  /**
   * Constructor - Initialize the InventoryPage object
   * @param {Page} page - Playwright page instance to interact with the browser
   */
  constructor(page) {
    this.page = page;

    // Define page elements using Playwright locators from centralized locator file
    // This approach separates locator definitions from page logic for easier maintenance
    this.productsTitle = page.locator(inventoryLocators.productsTitle);
    this.addToCartButton = page.locator(inventoryLocators.addToCartButton);
  }

  /**
   * Verify that the Products title is visible on the inventory page
   *
   * This method checks if the main "Products" heading is displayed, confirming that
   * the user has successfully navigated to the inventory page after login.
   *
   * Steps performed:
   * 1. Log the verification action
   * 2. Assert that the products title element is visible on the page
   */
  async verifyProductsVisible() {
    logger.info('Verifying Products title is visible');
    await expect(this.productsTitle).toBeVisible();
  }

  /**
   * Click on a specific product to navigate to its detail page
   *
   * This method finds and clicks on a product name from the inventory list.
   * It uses a dynamic locator that matches the product card containing the specified name,
   * then clicks on the product name link within that card.
   *
   * @param {string} productName - The exact name of the product to click (e.g., "Sauce Labs Bolt T-Shirt")
   *
   * Steps performed:
   * 1. Log the product selection action
   * 2. Create a locator for the product card containing the specified name
   * 3. Find and click the product name link within that card
   * 4. Navigate to the product detail page
   */
  async clickProduct(productName) {
    logger.info(`Clicking product: ${productName}`);

    // Create a locator for the product card that contains the specified product name
    const productCard = this.page.locator(inventoryLocators.productCard(productName));

    // Click on the product name link within the product card to navigate to detail page
    await productCard.locator('.inventory_item_name').click();
  }

  /**
   * Verify that the "Back to products" button is visible (typically on product detail pages)
   *
   * This method checks if the back navigation button is displayed, which is usually
   * present on individual product detail pages to return to the main inventory list.
   *
   * Steps performed:
   * 1. Log the verification action
   * 2. Assert that the back to products button is visible on the page
   */
  async verifyBackToProductsVisible() {
    logger.info('Verifying Back to products button is visible');
    await expect(this.page.locator(inventoryLocators.backToProducts)).toBeVisible();
  }

  /**
   * Add a product to the shopping cart
   *
   * This method clicks the "Add to cart" button to add the currently viewed product
   * to the shopping cart. This is typically called from a product detail page.
   *
   * @param {string} productName - The name of the product being added (for logging purposes)
   *
   * Steps performed:
   * 1. Log the add to cart action with product name
   * 2. Click the "Add to cart" button
   * 3. Product is added to cart (cart badge should update automatically)
   */
  async addProductToCart(productName) {
    logger.info(`Adding product to cart: ${productName}`);

    // Click the add to cart button to add the current product to the shopping cart
    await this.addToCartButton.click();
  }
}

module.exports = InventoryPage;
