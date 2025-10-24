import { getModels, getTypes } from '../support/app.po';

describe('detail-e2e', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/vehicles/GetVehicleTypesForMakeId/**', {
      fixture: 'vehicle-types.json',
    }).as('GetVehicleTypesForMakeId');
    cy.intercept('GET', '**/api/vehicles/GetModelsForMakeId/**', {
      fixture: 'vehicle-models.json',
    }).as('GetModelsForMakeId');

    cy.visit('/detail/12858');
  });

  it('should display the Vehicle Explorer page', () => {
    cy.contains('Vehicle Explorer').should('be.visible');
    cy.contains('Vehicles types').should('be.visible');
    cy.contains('Vehicles Models').should('be.visible');
  });

  it('should navigate back when Back button is clicked', () => {
    cy.get('button').contains('Back').click();
    cy.url().should('not.include', '/detail/12858');
  });

  it('should display the vehicles models', () => {
    cy.wait('@GetModelsForMakeId');
    cy.wait('@GetVehicleTypesForMakeId');

    getModels().should('have.length', 1);
  });

  it('should display the vehicles types', () => {
    cy.wait('@GetModelsForMakeId');
    cy.wait('@GetVehicleTypesForMakeId');

    getTypes().should('have.length', 1);
  });
});
