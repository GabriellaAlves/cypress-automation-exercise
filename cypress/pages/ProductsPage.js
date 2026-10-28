class ProductsPage {
  assertProductsPage() {
    cy.url().should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  }

  openFirstProduct() {
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('a', 'View Product').click();
    });
  }

  assertProductDetails() {
    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2').should('be.visible');
      cy.contains('Category:').should('be.visible');
      cy.contains('Rs.').should('be.visible');
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });
  }

  search(term) {
    cy.get('#search_product').clear().type(term);
    cy.get('#submit_search').click();
  }

  assertSearchResults() {
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  }
}
module.exports = new ProductsPage();