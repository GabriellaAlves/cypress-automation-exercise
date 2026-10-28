class CheckoutPage {
  completePayment() {
    cy.completeCheckoutPayment();
  }
}
module.exports = new CheckoutPage();