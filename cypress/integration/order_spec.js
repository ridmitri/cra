describe('Order page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit('/order');
    });
    
    it('Visits Order', () => {
        cy.url().should('include', '/order');
    });

    it('Navigates to dashboard after Order was placed', () => {
        cy.url().should('include', '/order');
        cy.get('.action-name').type('Cypress pizza');
        cy.get('input[name="ananas"]').click();
        cy.get('.action-submit').click();
        cy.url().should('include', '/dashboard');
        cy.get('table tr:first-child').contains('Cypress pizza');
    });
});
