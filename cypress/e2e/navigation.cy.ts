describe('Navigation and Layout', () => {
    beforeEach(() => {
        cy.login('admin@prodmanager.com', 'Admin123');
        cy.visit('/dashboard');
    });

    it('should navigate through the navbar links', () => {
        cy.get('nav').contains('Materials').click();
        cy.url().should('include', '/raw-materials');

        cy.get('nav').contains('Products').click();
        cy.url().should('include', '/products');

        cy.get('nav').contains('Dashboard').click();
        cy.url().should('include', '/dashboard');
    });

    it('should logout successfully', () => {
        cy.get('[data-testid="logout-button"]').click();
        cy.url().should('include', '/login');
    });
});