describe('Home page', () => {
  before(() => {
    cy.visit('http://localhost:8000');
  });

  describe('renders page and contents', () => {
    it('renders a page container', () => {
      cy.get('.page-container');
    });
    it('displays the website title', () => {
      cy.contains('30 seconds of code');
    });
    it('renders a top collections section', () => {
      cy.contains('Top collections');
    });
    it('contains 4 top collections', () => {
      cy.get('.listing-anchors > .btn').should('have.length', 4);
    });
    it('remders a recommended snippets section', () => {
      cy.contains('Recommended snippets');
    });
    it('contains 10 snippet recommendations', () => {
      cy.get('.preview-card').should('have.length', 10);
    });
  });

  describe('search interactions behave as expected', () => {
    before(() => {
      cy.get('.search-box').type('arr');
    });

    it('updates the search box value', () => {
      cy.get('.search-box').should('have.value', 'arr');
    });
    it('renders a search results section', () => {
      cy.contains('Search results');
    });
    it('contains more cards than just the snippet recommendations', () => {
      cy.get('.preview-card').its('length').should('be.gt', 10);
    });
    it('contains more cards than just the snippet recommendations', () => {
      cy.get('.preview-card').its('length').should('be.gt', 10);
    });
  });

  describe('clicking on a content tag behaves as expected', () => {
    before(() => {
      cy.get('.btn').contains('JavaScript').click();
    });

    it('navigates the user to the correct URL', () => {
      cy.url().should('contain', '/js/p/1');
    });
    it('the page title is the same as the collection title', () => {
      cy.get('.page-title').contains('JavaScript');
    });
  });
});
