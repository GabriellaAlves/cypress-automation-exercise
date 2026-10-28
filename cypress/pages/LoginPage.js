class LoginPage {
  assertLoginForm() {
    cy.contains('h2', 'Login to your account').should('be.visible');
  }

  login(email, password) {
    cy.loginWithCredentials(email, password);
  }

  assertInvalidCredentials() {
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
  }

  assertLoginPageVisible() {
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
  }

  signup(name, email) {
    cy.get('[data-qa="signup-name"]').clear().type(name);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.contains('button', 'Signup').click();
  }

  assertSignupVisible() {
    cy.contains('h2', 'New User Signup!').should('be.visible');
  }

  assertDuplicateEmailError() {
    cy.contains('p', 'Email Address already exist!').should('be.visible');
  }
}
module.exports = new LoginPage();