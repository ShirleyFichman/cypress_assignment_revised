// Step 7 also added checking of the password input elemment.
// Added step 10 and then 11 in the same test: "should confirms the back button works and then pressing next..."
// in checking the back button and the cancel button added the check that we can see the email address in the input field.
// Added step 13 that I didn't finish previously.

///<reference types="Cypress"/>

describe("Password", () => {
    beforeEach(() => {
      cy.fixture("valid_user.json").as("user");
      cy.intercept({
        method: 'POST',
        url: 'https://stgchrome.paradox.ai/api/v1/auth'
      }).as('post_password');
      cy.visit("/");
      cy.get('@user').then((user) => {
        const {email, password}= user;
        cy.signin_email_with_enter(email);
        });
    });

    it("should confirm the following elements exist", () => {
      cy.get('@user').then((user) => {
        const {email, password}= user;
        cy.contains(email);
        cy.getById('password-input').should('be.visible');
        cy.getById('signin-button').should('be.visible');
        cy.getById('submit-password-cancel').should('be.visible');
        cy.getById('keep-me-signed-in-checkbox').should('be.visible');
        cy.getById('forgot-password').should('be.visible');
      });
    });

    it("should confirm the cancel button works with email shown and clicking next to password page", () => {
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.getById('submit-password-cancel').click();
            cy.getById('email-login-input').should('have.value', email);
            cy.getById('email-login-submit-button').click();
            cy.getById('password-input').should('be.visible');
            cy.getById('signin-button').should('be.visible');
        });
    });

    it("should confirm the back button works with email shown and clicking next to password page", () => {
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.getById('login-header-back-button').click();
            cy.getById('email-login-input').should('have.value', email);
            cy.getById('email-login-submit-button').click();
            cy.getById('password-input').should('be.visible');
            cy.getById('signin-button').should('be.visible');
        });
    });

    it("should check the URL that forgot your password button leads to", () => {
        cy.getById('forgot-password').click()
        .invoke("attr", "target", "_self")
        .click(); 
        cy.url().should('include', 'https://stg.paradox.ai/forgot-password');
    }); 
 
    it("should make sure that the remember_me field has a proper value in the API call", () => {
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.get('.checkbox-input').click({force: true});
            cy.enter_valid_password(password);
            cy.wait('@post_password').its('request.body.remember_me').should('eq', 0);
            cy.contains('Secure Login');
            cy.contains('Please enter the code to continue.');
        });
    });
});
