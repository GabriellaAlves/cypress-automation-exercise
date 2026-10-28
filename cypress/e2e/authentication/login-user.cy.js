const home = require('../../pages/HomePage');
const login = require('../../pages/LoginPage');
const account = require('../../pages/AccountPage');

describe('TC02 - Login User with correct email and password', () => {

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

  it('logs in with valid credentials and deletes the account', () => {
    cy.get('@newUser').then(({ email }) => {
      cy.fixture('users').then(({ registration }) => {

        login.assertLoginForm();
        login.login(email, registration.password);

        account.assertLoggedIn();
        account.deleteAccount();
      });
    });
  });
});

describe('TC03 - Login User with incorrect email and password', () => {
  it('shows an error for invalid credentials', () => {
    cy.fixture('users').then(({ invalidLogin }) => {
      home.visit();
      home.openLogin();
      login.assertLoginForm();
      login.login(invalidLogin.email, invalidLogin.password);
      login.assertInvalidCredentials();
    });
  });
});

describe('TC05 - Register User with existing email', () => {
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
  
  it('shows an error when the email is already registered', () => {
    cy.get('@newUser').then(({ email }) => {
      cy.fixture('users').then(({ registration }) => {

        login.assertSignupVisible();
        login.signup(email, registration.password);

        login.assertDuplicateEmailError();
      });
    });
  });
});