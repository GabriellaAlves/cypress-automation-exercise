class HomePage {
  visit() {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
  }

  openLogin() {
    cy.contains('a', 'Signup / Login').click();
  }

  openProducts() {
    cy.contains('a', 'Products').click();
  }

  openCart() {
    cy.contains('a', 'Cart').click();
  }

  assertLoggedInAs(name) {
    cy.contains('Logged in as').should('be.visible');
    if (name) cy.contains('Logged in as').should('contain.text', name);
  }
}
module.exports = new HomePage();