const home = require('../../pages/HomePage');

describe('TC10 - Verify Subscription in home page', () => {
  it('subscribes an email from the home page footer', () => {
    cy.fixture('users').then(({ subscription }) => {
      home.visit();
      cy.get('footer').scrollIntoView();
      cy.contains('h2', 'Subscription').should('be.visible');
      cy.get('#susbscribe_email').should('be.visible').type(`${Date.now()}.${subscription.email}`);
      cy.get('#subscribe').click();
      cy.get('.alert-success').should('contain.text', 'You have been successfully subscribed!');
    });
  });
});