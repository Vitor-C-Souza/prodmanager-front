describe('Raw Materials Management', () => {

    beforeEach(() => {
        cy.login('admin@prodmanager.com', 'Admin123');
        cy.visit('/raw-materials');

        cy.intercept('GET', '**/api/v1/raw-materials').as('getMaterials');
        cy.intercept('POST', '**/api/v1/raw-materials').as('createMaterial');
        cy.intercept('PUT', '**/api/v1/raw-materials/*').as('updateMaterial');
        cy.intercept('PATCH', '**/api/v1/raw-materials/*/stock').as('updateStock');
        cy.intercept('DELETE', '**/api/v1/raw-materials/*').as('deleteMaterial');

        cy.wait('@getMaterials');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('[data-testid="add-material-button"]').click();
        cy.get('[data-testid="submit-material-button"]').click();

        cy.contains('Material name is required').should('be.visible');
        cy.contains('Material code is required').should('be.visible');
    });

    it('should successfully create a new raw material', () => {
        const materialName = `Steel Bar ${Date.now()}`;

        cy.get('[data-testid="add-material-button"]').click();
        cy.get('[data-testid="material-name-input"]').type(materialName);
        cy.get('[data-testid="material-code-input"]').type(`ST-${Date.now()}`);
        cy.get('[data-testid="material-stock-input"]').clear().type('100');
        cy.get('[data-testid="submit-material-button"]').click();

        cy.wait('@createMaterial');
        cy.wait('@getMaterials');
        cy.contains(materialName).should('be.visible');
    });

    it('should successfully update name and adjust stock', () => {
        const updatedName = `Updated Steel ${Date.now()}`;

        cy.get('.group').first().within(() => {
            cy.get('[data-testid="edit-material-button"]').click();
        });

        cy.get('form').should('be.visible').within(() => {
            cy.get('[data-testid="material-name-input"]')
                .should('not.have.value', '')
                .clear()
                .type(updatedName);

            cy.get('[data-testid="material-stock-input"]').clear().type('50');
            cy.get('[data-testid="submit-material-button"]').click();
        });

        cy.wait(['@updateMaterial', '@updateStock']);
        cy.wait('@getMaterials');

        cy.contains(updatedName).should('be.visible');
    });

    it('should successfully delete a raw material', () => {
        cy.get('.group').first().then(($card) => {
            const nameToDelete = $card.find('h3').text();

            cy.wrap($card).find('[data-testid="delete-material-button"]').click();

            cy.get('h3').contains(/Delete Material/i).should('be.visible');

            cy.get('[data-testid="confirm-modal-button"]').click();

            cy.wait('@deleteMaterial');
            cy.wait('@getMaterials');

            cy.contains(nameToDelete).should('not.exist');
        });
    });
});