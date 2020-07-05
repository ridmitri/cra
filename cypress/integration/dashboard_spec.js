describe('Dashboard page', () => {
  beforeEach(() => {
    // cy.login()
  })
  it('Visits Dashboard', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');


  });

});
