class CartPage {
  assertCartVisible() {
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info').should('be.visible');
    cy.get('#cart_info tbody tr').should('have.length.greaterThan', 0);
  }

  proceedToCheckout() {
    cy.contains('a', 'Proceed To Checkout').click();
  }

  assertCheckoutAddressesAndOrder() {
    cy.contains(/Address Details/i).should('be.visible');
    cy.contains(/Review Your Order/i).should('be.visible');
  }
}
module.exports = new CartPage();