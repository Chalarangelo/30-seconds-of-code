describe('Listing page', () => {
  before(() => {
    cy.visit('http://localhost:8000/list/p/1');
  });

  describe('renders page and contents', () => {
    it('renders a page container', () => {
      cy.get('.page-container');
    });
    it('displays the page title', () => {
      cy.get('.page-title').contains('Snippet List');
    });
    it('contains 20 snippet preview cards', () => {
      cy.get('.preview-card').should('have.length', 20);
    });
  });

  describe('clicking on a pagination button behaves as expected', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/list/p/1');
    });

    it('navigates the user to the second page', () => {
      cy.get('.paginator .btn').contains('2').click();
      cy.url().should('contain', '/list/p/2');
    });
    it('navigates the user to the next page', () => {
      cy.get('.paginator .btn.next-page').click();
      cy.url().should('contain', '/list/p/2');
    });
  });

  describe('clicking on a preview card behaves as expected', () => {
    before(() => {
      cy.get('.preview-card').first().click();
    });

    it('navigates the user to a snippet page', () => {
      cy.url().should('contain', '/s/');
    });
  });
});
