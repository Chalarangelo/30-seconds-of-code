import literals from 'lang/en/client/search';

describe('Search', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
    cy.get('input[type="search"]').type('difference{enter}');
  });

  it('should redirect to the search page', () => {
    cy.url().should('contain', '/search');
    cy.url().should('contain', 'keyphrase=difference');
  });

  describe('search results', () => {
    it('should display the correct title', () => {
      cy.get('.page-title', { timeout: 5000 }).contains(literals.results);
    });

    it('should display search results', () => {
      cy.get('.list-card').its('length').should('gte', 1);
    });

    it('should display at least one snippet with the given query in its name', () => {
      cy.get('.card-title').contains('difference');
    });
  });

  describe('search refinement', () => {
    before(() => {
      cy.visit('http://localhost:9000/search');
      cy.get('input[type="search"]').type('difference');
      cy.get('input[type="search"]').type('By');
    });

    it('should update the URL', () => {
      cy.url().should('contain', '/search');
      cy.url().should('contain', 'keyphrase=differenceBy');
    });

    it('should update search results to match the new query', () => {
      cy.get('.card-title').contains('differenceBy');
    });
  });

  describe('dead end search', () => {
    before(() => {
      cy.get('input[type="search"]').type(
        'withoutresultsthisisnotlikelytofindanything'
      );
    });

    it('should return no results', () => {
      cy.get('.search-no-results').should('have.length', 1);
    });

    it('should display a recommendation list', () => {
      cy.get('.recommendation-list-title').should('have.length', 1);
    });
  });
});
