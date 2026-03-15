/**
 * Inventory Page Locators
 *
 * This file contains all locator definitions for elements on the SauceDemo inventory/product pages.
 * Uses a mix of text-based and CSS selectors for reliable element identification.
 * Centralizing locators here improves maintainability and reusability across the framework.
 *
 * Locator Strategy:
 * - Text-based locators for simple text elements (reliable and readable)
 * - CSS selectors with :has-text() pseudo-selector for dynamic product matching
 * - These locators are used by the InventoryPage class in the Page Object Model
 */

// Export an object containing all inventory page element locators
module.exports = {
  // Locator for the main "Products" title on the inventory page
  // Uses text-based locator to find elements containing "Products"
  productsTitle: 'text=Products',

  // Dynamic locator function for product cards
  // Returns a CSS selector that finds inventory item containers containing specific product text
  // @param {string} productName - The name of the product to locate
  // @returns {string} CSS selector for the product card
  productCard: (productName) => `.inventory_item:has-text("${productName}")`,

  // Locator for the "Add to cart" button (typically on product detail pages)
  // Uses text-based locator to find buttons containing "Add to cart"
  addToCartButton: 'text=Add to cart',

  // Locator for the "Back to products" button (on product detail pages)
  // Uses text-based locator to find buttons containing "Back to products"
  backToProducts: 'text=Back to products'
};