const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: {
    runMode: 1,
    openMode: 0
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    
    env: {
      userName: 'Cypress Test User',
      userEmail: process.env.CYPRESS_USER_EMAIL || '',
      userPassword: process.env.CYPRESS_USER_PASSWORD || '',
      logoutEmail: process.env.CYPRESS_LOGOUT_EMAIL || '',
      logoutPassword: process.env.CYPRESS_LOGOUT_PASSWORD || '',
      checkoutEmail: process.env.CYPRESS_CHECKOUT_EMAIL || '',
      checkoutPassword: process.env.CYPRESS_CHECKOUT_PASSWORD || ''
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});