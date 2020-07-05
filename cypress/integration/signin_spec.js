describe('Signin page', () => {
    it('Visits Signin', () => {
        cy.visit('http://localhost:3000');
        cy.url().should('include', '/');

        // Get an input, type into it and verify that the value has been updated
        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com');
        cy.get('.action-password')
            .type('123456')
            .should('have.value', '123456');
    });

    it('Signs in with correct credentials on Enter')
    it('Signs in with correct credentials on click')

    it('Redirects to /dashboard after signin')

    it('Signs out on click to signout')
    it('Shows error message when credentials are incorrect')
});
