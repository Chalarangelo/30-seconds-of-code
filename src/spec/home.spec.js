/* eslint-disable cypress/no-unnecessary-waiting */
/* Waiting times necessary for some slow redirect sequences */

describe('Home', () => {
  before(() => {
    cy.visit('http://localhost:9000');
  });

  it('should display the correct title', () => {
    cy.get('.home-title').its('length').should('eq', 1);
  });

  it('should display the correct shelves', () => {
    cy.get('.collections-shelf-title').its('length').should('eq', 1);
    cy.get('.snippets-shelf-title').its('length').should('eq', 2);
  });

  it('should display collections', () => {
    cy.get('.collection-chip').its('length').should('gte', 1);
  });

  it('should display snippets', () => {
    cy.get('.list-card').its('length').should('gte', 1);
  });
});
