// In checking the checkbox I used {force: true} because of the CSS property: `display: none` 
// Did not do step 5 because were asked to ignore invalid inputs
// In the valid login- should have checked with pressing the next button in addition to checking the enter keyboard. 
// therefore added a test and commands

///<reference types="Cypress"/>

describe("Lookup", () => {
  beforeEach(() => {
    cy.fixture("valid_user.json").as("user");
    cy.visit("/");
  });

  it("should open the webpage", () => {
    cy.url().should('include', 'https://stgchrome.paradox.ai/automation-engineer-assignment/');
    cy.window();
  });

  it("should confirm the following elements exist", () => {
    cy.getById('email-login-input').should('be.visible');
    cy.getById('email-login-submit-button').should('be.visible');
    cy.get('.text-paddint-top').contains(/Keep Me/);
  });

  it("should confirm the keep me signed in checkbox works", () => {
    cy.get('.checkbox-input').click({force: true});
    cy.get('.checkbox-input').should('be.not.checked');
    cy.get('.checkbox-input').click({force: true});
    cy.get('.checkbox-input').should('be.checked');
  });

  it("should login with a valid email and press enter and redirect to password page", () => {
    cy.get('@user').then((user) => {
     const {email, password}= user;
     cy.signEmailWithEnter(email);
     cy.contains(email);
     cy.getById('password-input').should('be.visible');
    });
  });

  it("should login with a valid email and press next and redirect to password page", () => {
    cy.get('@user').then((user) => {
     const {email, password}= user;
     cy.signEmailWithNext(email);
     cy.contains(email);
     cy.getById('password-input').should('be.visible');
    });
  });
});