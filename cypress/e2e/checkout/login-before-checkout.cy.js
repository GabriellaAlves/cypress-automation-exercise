const home = require('../../pages/HomePage');
const login = require('../../pages/LoginPage');
const products = require('../../pages/ProductsPage');
const cart = require('../../pages/CartPage');
const account = require('../../pages/AccountPage');

describe('TC16 - Place Order: Login before Checkout', () => {
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
  
    it('logs in, places an order, and deletes the account', () => {
      cy.get('@newUser').then(({ email }) => {
        cy.fixture('users').then(({ registration }) => {
  
          login.assertLoginForm();
          login.login(email, registration.password);
  
          account.assertLoggedIn();

          home.openProducts();
          products.assertProductsPage();
          cy.addFirstProductToCart();
          home.openCart();
          cart.assertCartVisible();
          cart.proceedToCheckout();
          cart.assertCheckoutAddressesAndOrder();
          cy.completeCheckoutPayment();
          cy.deleteCurrentAccount();
        });
      });
    });
  });