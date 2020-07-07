describe('Signin page: Loading', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(Cypress.env('email'), Cypress.env('password'));
    });

    it('Signs out on click to signout', () => {
        cy.get('.action-signout').click();
        cy.window().then((window) => {
            expect(window.localStorage.getItem('email')).to.be.null;
            expect(window.localStorage.getItem('password')).to.be.null;
        });
    });

    it('Redirects to / after signout', () => {
        cy.get('.action-signout').click();
        cy.url().should('include', '/');
    });
});
