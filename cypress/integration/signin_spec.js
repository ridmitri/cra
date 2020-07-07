describe('Signin page: login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Visits Signin', () => {
        cy.url().should('include', '/');
        cy.get('.action-email')
            .type(Cypress.env('email'))
            .should('have.value', Cypress.env('email'));
        cy.get('.action-password')
            .type(Cypress.env('password'))
            .should('have.value', `${Cypress.env('password')}`);
    });

    it('Signs in with correct credentials on Enter', () => {
        // Get an input, type into it and verify that the value has been updated
        cy.get('.action-email').type(Cypress.env('email'));
        cy.get('.action-password').type(Cypress.env('password') + '{enter}');
        cy.wait(200);
        cy.window().then((window) => {
            expect(window.localStorage.getItem('email')).to.equal(
                Cypress.env('email')
            );
            expect(window.localStorage.getItem('password')).to.equal(
                Cypress.env('password')
            );
        });
    });

    it('Signs in with correct credentials on click', () => {
        cy.get('.action-email')
            .type(Cypress.env('email'))
            .should('have.value', Cypress.env('email'));
        cy.get('.action-password')
            .type(Cypress.env('password'))
            .should('have.value', `${Cypress.env('password')}`);
        cy.get('.action-submit').click();
        cy.wait(200);
        cy.window().then((window) => {
            expect(window.localStorage.getItem('email')).to.equal(
                Cypress.env('email')
            );
            expect(window.localStorage.getItem('password')).to.equal(
                Cypress.env('password')
            );
        });
    });

    it('Redirects to /dashboard after signin', () => {
        cy.get('.action-email')
            .type(Cypress.env('email'))
            .should('have.value', Cypress.env('email'));
        cy.get('.action-password')
            .type(Cypress.env('password'))
            .should('have.value', `${Cypress.env('password')}`);
        cy.get('.action-submit').click();
        cy.url().should('include', '/dashboard');
    });

    it('logins on startup with stored locally credentials', () => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/');
        cy.url().should('include', '/dashboard');

    })

    it('Shows error message when credentials are incorrect', () => {
        cy.get('.action-email').type(Cypress.env('email'));
        cy.get('.action-password').type(
            'typo' + Cypress.env('password') + '{enter}'
        );
        cy.get('.error-message').should('be.visible');
        cy.window().then((window) => {
            expect(window.localStorage.getItem('email')).to.be.null;
            expect(window.localStorage.getItem('password')).to.be.null;
        });
    });
});
