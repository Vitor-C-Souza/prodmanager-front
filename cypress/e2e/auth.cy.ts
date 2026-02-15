describe('Authentication', () => {
    it('should show validation errors for empty fields', () => {
        cy.visit('/login');

        cy.get('[data-testid="login-submit-button"]').click();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');

        cy.get('[data-testid="error-message"]').should('not.exist');
    });
    it('should fail to login with incorrect credentials', () => {
        cy.visit('/login');
        cy.get('[data-testid="email-input"]').type('wrong@admin.com');
        cy.get('[data-testid="password-input"]').type('WrongPass123');
        cy.get('[data-testid="login-submit-button"]').click();

        cy.get('[data-testid="error-message"]', { timeout: 10000 })
            .should('be.visible')
            .and('not.be.empty');
    });

    it('should redirect unauthenticated users to login page', () => {
        cy.clearLocalStorage();
        cy.visit('/products');
        cy.url().should('include', '/login');
    });

    it('should logout successfully', () => {
        cy.login('admin@prodmanager.com', 'Admin123');
        cy.visit('/dashboard');

        cy.get('[data-testid="logout-button"]').should('be.visible').click();

        cy.url().should('include', '/login');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('token')).to.be.null;
        });
    });

    it('should show loading state during login request', () => {
        cy.intercept('POST', '**/auth/login', {
            delay: 2000,
            statusCode: 200,
            body: { token: 'fake-token', user: { email: 'admin@prodmanager.com' } }
        }).as('slowLogin');

        cy.visit('/login');
        cy.get('[data-testid="email-input"]').type('admin@prodmanager.com');
        cy.get('[data-testid="password-input"]').type('Admin123');
        cy.get('[data-testid="login-submit-button"]').click();

        cy.get('[data-testid="login-submit-button"]')
            .should('be.disabled')
            .and('contain', 'Processing...');

        cy.wait('@slowLogin');
        cy.url().should('include', '/dashboard');
    });
});