describe('Product Management', () => {
    let createdProductName: string;

    beforeEach(() => {
        cy.login('admin@prodmanager.com', 'Admin123');
        cy.visit('/products');

        cy.intercept('GET', '**/api/v1/products').as('getProducts');
        cy.intercept('POST', '**/api/v1/products').as('createProduct');
        cy.intercept('PUT', '**/api/v1/products/*').as('updateProduct');
        cy.intercept('DELETE', '**/api/v1/products/*').as('deleteProduct');
    });

    it('should show validation errors when creating a product with empty fields', () => {
        cy.get('[data-testid="add-product-button"]').click();
        cy.get('button[type="submit"]').click();

        cy.contains('Name is required').should('be.visible');
        cy.contains('Price must be greater than zero').should('be.visible');
    });

    it('should successfully create a new product', () => {
        createdProductName = 'Industrial Engine ' + Date.now();

        cy.get('[data-testid="add-product-button"]').click();
        cy.get('[data-testid="product-name-input"]').type(createdProductName);
        cy.get('[data-testid="product-code-input"]').type('ENG-' + Date.now());
        cy.get('[data-testid="product-price-input"]').clear().type('1500.00');
        cy.get('[data-testid="submit-product-button"]').click();

        cy.wait('@createProduct');
        cy.wait('@getProducts');
        cy.contains(createdProductName).should('be.visible');
    });

    it('should successfully update the product name and price', () => {
        const newName = 'Engine Updated ' + Date.now();
        const newPrice = '1750.00';

        cy.get('.group').first().within(() => {
            cy.get('[data-testid="edit-button"]').click();
        });

        cy.get('[data-testid="product-form"]').should('be.visible').within(() => {

            cy.get('[data-testid="product-name-input"]')
                .should('not.have.value', '')
                .clear()
                .type(newName);

            cy.get('[data-testid="product-price-input"]')
                .clear()
                .type(newPrice);

            cy.get('[data-testid="submit-product-button"]').click();
        });

        cy.wait('@updateProduct');
        cy.wait('@getProducts');

        cy.contains(newName).should('be.visible');
        cy.contains(`$${newPrice}`).should('be.visible');
        createdProductName = newName;
    });

    it('should successfully delete the product', () => {
        cy.contains(createdProductName)
            .closest('.group')
            .within(() => {
                cy.get('[data-testid="delete-button"]').click();
            });

        cy.get('[data-testid="confirm-modal-button"]').should('be.visible').click();

        cy.wait('@deleteProduct');
        cy.wait('@getProducts');

        cy.contains(createdProductName).should('not.exist');
    });
});