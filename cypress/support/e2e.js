import './commands';
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (err) => {
  // The practice site can emit third-party script errors unrelated to the UI flow.
  // Do not suppress assertion failures or application errors generally.
  if (/ResizeObserver loop|Script error/i.test(err.message)) {
    return false;
  }
  return undefined;
});