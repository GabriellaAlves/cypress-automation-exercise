const home = require('../../pages/HomePage');
const products = require('../../pages/ProductsPage');

describe('TC09 - Search Product', () => {
  it('shows matching products for a search term', () => {
    cy.fixture('products').then(({ searchTerm }) => {
      home.visit();
      home.openProducts();
      products.assertProductsPage();
      products.search(searchTerm);
      products.assertSearchResults();
      cy.get('.features_items .product-image-wrapper').each(($product) => {
        cy.wrap($product).should('contain.text', searchTerm);
      });
    });
  });
});