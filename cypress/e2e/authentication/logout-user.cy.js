const home = require('../../pages/HomePage');
const login = require('../../pages/LoginPage');
const account = require('../../pages/AccountPage');

describe('TC04 - Logout User', () => {
  beforeEach(() => {
    home.visit();
    home.openLogin();
    login.assertSignupVisible();
    
    cy.fixture('users').then(({ registration }) => {
      cy.registerNewUser(registration);

      // O comando de cadastro deixa o usuário logado.
      // Faz logout para que o TC02 valide o login.
      cy.get('a[href="/logout"]').click();
    });
  });

  it('logs out and returns to the login page', () => {
    cy.get('@newUser').then(({ email }) => {
      cy.fixture('users').then(({ registration }) => {

        login.assertLoginForm();
        login.login(email, registration.password);

        account.assertLoggedIn();
        cy.contains('a', 'Logout').click();
        login.assertLoginPageVisible();
      });
    });
  });
});


