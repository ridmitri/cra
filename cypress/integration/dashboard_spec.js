describe('Dashboard page', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/');
    });

    it('Visits Dashboard', () => {
        cy.url().should('include', '/dashboard');
    });

    it('Navigates to order form on click on Place order', () => {
        cy.url().should('include', '/dashboard');
        cy.get('.action-order').click();
        cy.url().should('include', '/order');
    });
});
