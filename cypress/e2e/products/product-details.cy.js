const home = require('../../pages/HomePage');
const products = require('../../pages/ProductsPage');

describe('TC08 - Verify All Products and product detail page', () => {
  it('shows the product list and details for the first product', () => {
    home.visit();
    home.openProducts();
    products.assertProductsPage();
    products.openFirstProduct();
    products.assertProductDetails();
  });
});