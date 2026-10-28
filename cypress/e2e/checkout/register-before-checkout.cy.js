const home = require('../../pages/HomePage');
const login = require('../../pages/LoginPage');
const products = require('../../pages/ProductsPage');
const cart = require('../../pages/CartPage');
const account = require('../../pages/AccountPage');

describe('TC15 - Place Order: Register before Checkout', () => {
  it('registers, places an order, and deletes the account', () => {
    cy.fixture('users').then(({ registration }) => {
      home.visit();
      home.openLogin();
      login.assertSignupVisible();

      const name = `Checkout User ${Date.now()}`;
      const email = `checkout.register.${Date.now()}@example.com`;
      login.signup(name, email);
      cy.contains('b', 'Enter Account Information').should('be.visible');

      const signup = require('../../pages/SignupPage');
      signup.completeRegistration(registration);
      signup.assertAccountCreated();
      cy.contains('a', 'Continue').click();
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