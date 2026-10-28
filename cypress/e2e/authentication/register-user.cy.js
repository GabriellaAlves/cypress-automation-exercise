const home = require('../../pages/HomePage');
const login = require('../../pages/LoginPage');
const account = require('../../pages/AccountPage');
const signup = require('../../pages/SignupPage');

describe('TC01 - Register User', () => {
  beforeEach(() => cy.fixture('users').as('users'));

  it('registers a new user and deletes the account', function () {
    home.visit();
    home.openLogin();
    login.assertSignupVisible();

    const name = `Cypress User ${Date.now()}`;
    const email = `cypress.${Date.now()}@example.com`;
    login.signup(name, email);

    cy.contains('b', 'Enter Account Information').should('be.visible');
    signup.completeRegistration(this.users.registration);
    signup.assertAccountCreated();
    cy.contains('a', 'Continue').click();
    account.assertLoggedIn();
    cy.deleteCurrentAccount();
  });
});