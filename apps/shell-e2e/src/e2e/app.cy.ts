import { getHeader, getRoot, getThemeToggler } from '../support/app.po';

describe('Shell E2E', () => {
  describe('Header', () => {
    beforeEach(() => {
      cy.visit('/'); // Base route
    });

    describe('Title', () => {
      it('should display the header', () => {
        getHeader().should('exist');
        getHeader().contains('Vehicle Explorer');
      });
    });

    describe('Theme toggler', () => {
      it('should start with dark theme', () => {
        getRoot().should('have.class', 'dark');
      });
      it('should toggle dark/light theme', () => {
        getRoot().should('have.class', 'dark');

        getThemeToggler().click();

        getRoot()
          .should('have.class', 'light')
          .and('not.have.class', 'dark');

        getThemeToggler().click();
        getRoot()
          .should('have.class', 'dark')
          .and('not.have.class', 'light');
      });
    });
  });

  describe('Loading indicator', () => {
    it('should show loading while API is fetching', () => {
      cy.intercept('GET', '**/vehicles/getallmakes?format=json', {
        fixture: 'makers.json',
        delay: 2000, // simulate slow network
      }).as('getMakers');

      cy.visit('/');

      cy.get('.loader-wrapper', { timeout: 3000 }).should('be.visible');

      cy.wait('@getMakers');

      cy.get('.loader-wrapper').should('not.exist');
    });
  });
});
