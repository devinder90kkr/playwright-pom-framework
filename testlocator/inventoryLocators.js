// Locators for Inventory Page (saucedemo.com)
module.exports = {
  productsTitle: 'text=Products',
  productCard: (productName) => `.inventory_item:has-text("${productName}")`,
  addToCartButton: 'text=Add to cart',
  backToProducts: 'text=Back to products'
};