const uniqueEmail = () => `cypress.${Date.now()}@example.com`;

Cypress.Commands.add('registerNewUser', (user) => {
  const name = `${user.namePrefix} ${Date.now()}`;
  const email = uniqueEmail();

  cy.wrap({ name, email }).as('newUser');
  cy.get('[data-qa="signup-name"]').should('be.visible').clear().type(name);
  cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email);
  cy.contains('button', 'Signup').click();

  cy.get('#id_gender1').check({ force: true });
  cy.get('#password').type(user.password, { log: false });
  cy.get('#days').select(user.birthDay);
  cy.get('#months').select(user.birthMonth);
  cy.get('#years').select(user.birthYear);
  cy.get('#newsletter').check({ force: true });
  cy.get('#optin').check({ force: true });
  cy.get('#first_name').type(user.firstName);
  cy.get('#last_name').type(user.lastName);
  cy.get('#company').type(user.company);
  cy.get('#address1').type(user.address);
  cy.get('#address2').type(user.address2);
  cy.get('#country').select(user.country);
  cy.get('#state').type(user.state);
  cy.get('#city').type(user.city);
  cy.get('#zipcode').type(user.zipcode);
  cy.get('#mobile_number').type(user.mobile);
  cy.contains('button', 'Create Account').click();

  cy.contains('b', 'Account Created!').should('be.visible');
  cy.contains('a', 'Continue').click();
  cy.contains('Logged in as').should('be.visible');
});


Cypress.Commands.add('loginWithCredentials', (email, password) => {
  const userEmail = email || Cypress.env('USER_EMAIL');
  const userPassword = password || Cypress.env('USER_PASSWORD');

  if (!userEmail || !userPassword) {
    throw new Error(
      'Missing login credentials. Set CYPRESS_USER_EMAIL and CYPRESS_USER_PASSWORD.'
    );
  }

  cy.visit('/login');

  cy.get('[data-qa="login-email"]').should('be.visible').type(userEmail);
  cy.get('[data-qa="login-password"]').should('be.visible').type(userPassword);
  cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.get('.features_items .product-image-wrapper').first().within(() => {
    cy.contains('a', 'Add to cart').click({ force: true });
  });
  cy.get('#cartModal').should('be.visible');
  cy.contains('#cartModal a', 'View Cart').click();
});

Cypress.Commands.add('completeCheckoutPayment', () => {
  cy.get('[name="message"]').type('Automated test order - please process.');
  cy.contains('a', 'Place Order').click();
  cy.get('[data-qa="name-on-card"]').type('Cypress Test');
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123');
  cy.get('[data-qa="expiry-month"]').type('12');
  cy.get('[data-qa="expiry-year"]').type('2030');
  cy.get('[data-qa="pay-button"]').click();});

Cypress.Commands.add('deleteCurrentAccount', () => {
  cy.contains('a', 'Delete Account').click();
  cy.contains('b', 'Account Deleted!').should('be.visible');
  cy.contains('a', 'Continue').click();
});