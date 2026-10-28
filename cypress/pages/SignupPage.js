class SignupPage {
  completeRegistration(user) {
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
  }

  assertAccountCreated() {
    cy.contains('b', 'Account Created!').should('be.visible');
  }
}
module.exports = new SignupPage();