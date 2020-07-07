describe('Dashboard page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(Cypress.env('email'), Cypress.env('password'));
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
