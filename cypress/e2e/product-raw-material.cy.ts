describe('Product link raw material Management', () => {

    const createdProductName = 'Industrial Engine ' + Date.now();
    const materialName = `Steel Bar ${Date.now()}`;
    let materialCreated: string;

    beforeEach(() => {
        cy.login('admin@prodmanager.com', 'Admin123');

        cy.intercept('GET', '**/api/v1/raw-materials').as('getMaterials');
        cy.intercept('GET', '**/api/v1/products').as('getProducts');
    });

    after(() => {
        // delete raw material
        cy.visit('/raw-materials');
        cy.intercept('DELETE', '**/api/v1/raw-materials/*').as('deleteMaterial');
        cy.get('.group').first().then(($card) => {
            const nameToDelete = $card.find('h3').text();

            cy.wrap($card).find('[data-testid="delete-material-button"]').click();

            cy.get('h3').contains(/Delete Material/i).should('be.visible');

            cy.get('[data-testid="confirm-modal-button"]').click();

            cy.wait('@deleteMaterial');
            cy.wait('@getMaterials');

            cy.contains(nameToDelete).should('not.exist');
        });

        // delete product
        cy.intercept('DELETE', '**/api/v1/products/*').as('deleteProduct');
        cy.visit('/products');
        cy.wait('@getProducts')
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


    it('should successfully manage product composition (link raw material)', () => {

        // create raw material to link
        cy.visit('/raw-materials');
        cy.intercept('POST', '**/api/v1/raw-materials').as('createMaterial');
        cy.wait('@getMaterials');



        cy.get('[data-testid="add-material-button"]').click();
        cy.get('[data-testid="material-name-input"]').type(materialName);
        cy.get('[data-testid="material-code-input"]').type(`ST-${Date.now()}`);
        cy.get('[data-testid="material-stock-input"]').clear().type('100');
        cy.get('[data-testid="submit-material-button"]').click();

        cy.wait('@createMaterial');
        cy.wait('@getMaterials');
        cy.contains(materialName).should('be.visible');

        materialCreated = materialName;

        // create product to link
        cy.visit('/products');
        cy.intercept('POST', '**/api/v1/products').as('createProduct');
        cy.wait('@getProducts');



        cy.get('[data-testid="add-product-button"]').click();
        cy.get('[data-testid="product-name-input"]').type(createdProductName);
        cy.get('[data-testid="product-code-input"]').type('ENG-' + Date.now());
        cy.get('[data-testid="product-price-input"]').clear().type('1500.00');
        cy.get('[data-testid="submit-product-button"]').click();

        cy.wait('@createProduct');
        cy.wait('@getProducts');
        cy.contains(createdProductName).should('be.visible');

        // link raw material to product

        cy.contains(createdProductName)
            .closest('.group')
            .within(() => {
                cy.get('[data-testid="composition-button"]').click();
            });

        cy.get('h2').contains(/Manage Composition/i).should('be.visible');

        cy.get('select').select(materialName)
        cy.get('input[placeholder="0"]').clear().type('5');

        cy.intercept('POST', '**/api/v1/products/*/materials').as('addMaterial');
        cy.get('button').contains(/Add to list/i).click();

        cy.wait('@addMaterial');

        cy.get('section').contains('Current Composition').parent().within(() => {
            cy.get('.bg-slate-50').should('have.length.at.least', 1);
        });

        cy.get('[data-testid="close-modal-button"]').click();
    });

    it('should successfully remove linked raw material from product composition', () => {
        cy.visit('/products');
        cy.intercept('GET', '**/api/v1/products').as('getProducts');
        cy.wait('@getProducts');

        cy.contains(createdProductName)
            .closest('.group')
            .within(() => {
                cy.get('[data-testid="composition-button"]').click();
            });

        cy.get('h2').contains(/Manage Composition/i).should('be.visible');

        cy.intercept('DELETE', '**/api/v1/products/*/materials/*').as('removeMaterial');

        cy.get('section').contains(/Current Composition/i).parent().within(() => {
            cy.contains(materialCreated)
                .closest('.bg-slate-50')
                .find('[data-testid="remove-composition-item-button"]')
                .click();
        });

        cy.get('h3').contains(/Remove Item/i).should('be.visible');
        cy.get('[data-testid="confirm-modal-button"]').click();

        cy.wait('@removeMaterial');
        cy.wait('@getProducts');


        cy.get('section').contains(/Current Composition/i).parent().within(() => {
            cy.contains(materialCreated).should('not.exist')
        });

        cy.get('[data-testid="close-modal-button"]').click();
    });
});