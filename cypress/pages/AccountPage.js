class AccountPage {
  assertLoggedIn() {
    cy.contains('Logged in as').should('be.visible');
  }

  deleteAccount() {
    cy.deleteCurrentAccount();
  }
}
module.exports = new AccountPage();