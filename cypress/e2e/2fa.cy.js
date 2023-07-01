///<reference types="Cypress"/>

describe("Lookup", () => {
    beforeEach(() => {
        cy.fixture("valid_user.json").as("user");
        cy.intercept({
            method: 'POST',    
            url: 'https://stgchrome.paradox.ai/api/v1/auth/request_login_code'
        }).as('request_login_code');
        cy.visit("/");
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.signin_email_with_enter(email);
            cy.enter_valid_password(password);
        });
    });

    it("should verify incorrect value", () => {
        cy.get('#input-37--0').type('1');
        cy.get('#input-37--1').type('2');
        cy.get('#input-37--2').type('3');
        cy.get('#input-37--3').type('4');
        cy.get('#input-37--4').type('5');
        cy.get('#input-37--5').type('6');
        cy.contains(/Incorrect verification code/);
    });

    it("should check redirection of didn't receive a code button and then resending the code and checking the API call", () => {
        cy.getById('2fa-didnt-receive-a-code-button').click();
        cy.get('.login-resend-verification').should('be.visible');
        cy.getById('2fa-resend-code').click();
        cy.get('@user').then((user) => {
            const {email, password}= user;
            cy.wait('@request_login_code').then((interception) =>{
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.request.body.phone_or_email).to.eq(email);
            });
        });
    });
});  