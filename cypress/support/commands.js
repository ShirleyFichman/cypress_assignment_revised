// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// The last getById I tried to implement was missing "" and therefore didn't work.

Cypress.Commands.addQuery('getById', (id) => {
    const getFn= cy.now('get', `[data-test="${id}"]`);
    return () => {return getFn();
    };
});

Cypress.Commands.add('signEmail', (email)=>{
    cy.getById('email-login-input').click();
    cy.getById('email-login-input').type(email);
});

Cypress.Commands.add('signEmailWithEnter', (email) => {
    cy.signEmail(email);
    cy.getById('email-login-input').type('{enter}');
});

Cypress.Commands.add('signEmailWithNext', (email) => {
    cy.signEmail(email);
    cy.getById('email-login-submit-button').click();
});

Cypress.Commands.add('enterValidPassword', (password) => {
    cy.getById('password-input').type(password);
    cy.getById('signin-button').click();
});