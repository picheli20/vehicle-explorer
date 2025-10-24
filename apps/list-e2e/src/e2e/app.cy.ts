import { getList, search } from '../support/app.po';

describe('List E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/vehicles/getallmakes?format=json', {
      fixture: 'makers.json',
    }).as('getMakers');

    cy.visit('/');
  });

  describe('List', () => {
    it('should display the list', () => {
      cy.wait('@getMakers');

      getList().should('have.length', 5);
    });

    it('should search for a specific maker', () => {
      cy.wait('@getMakers');

      const list = search('IronWorks');

      list.should('have.length', 1);
    });
  });
});
