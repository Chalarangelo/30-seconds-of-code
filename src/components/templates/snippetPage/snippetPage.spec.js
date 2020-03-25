describe('Snippet page', () => {
  before(() => {
    cy.visit('http://localhost:8000/js/s/shuffle/');
  });

  describe('renders page and contents', () => {
    it('renders a page container', () => {
      cy.get('.page-container');
    });
    it('contains a snippet card', () => {
      cy.get('.snippet-card');
    });
    it('displays the page title', () => {
      cy.get('.card-title').contains('shuffle');
    });
    it('contains a CTA', () => {
      cy.get('.graphic-cta');
    });
    it('contains 3 snippet recommendations ', () => {
      cy.get('.preview-card').should('have.length', 3);
    });
  });
});
