describe('Snippet', () => {
  describe('Simple', () => {
    before(() => {
      cy.visit('http://localhost:9000/js/s/shuffle/');
    });

    it('should display a snippet card', () => {
      cy.get('.snippet-card').should('have.length', 1);
    });

    it('should display the correct title', () => {
      cy.get('.card-title').contains('shuffle');
    });

    it('should display the correct code snippet', () => {
      cy.get('.card-code').contains('shuffle');
    });

    it('should display a copy button', () => {
      cy.get('.copy-btn').should('have.length', 1);
    });

    it('should display a recommendation list', () => {
      cy.get('.recommendation-list-title').should('have.length', 1);
    });
  });

  describe('React', () => {
    before(() => {
      cy.visit('http://localhost:9000/react/s/tabs');
    });

    it('should display a snippet card', () => {
      cy.get('.snippet-card').should('have.length', 1);
    });

    it('should display the correct title', () => {
      cy.get('.card-title').contains('Tabs');
    });

    it('should display the correct code snippet', () => {
      cy.get('.card-code').contains('Tabs');
    });

    it('should display a Codepen button', () => {
      cy.get('.codepen-btn').should('have.length', 1);
    });

    it('should display a recommendation list', () => {
      cy.get('.recommendation-list-title').should('have.length', 1);
    });
  });

  describe('CSS', () => {
    before(() => {
      cy.visit('http://localhost:9000/css/s/mouse-cursor-gradient-tracking');
    });

    it('should display a snippet card', () => {
      cy.get('.snippet-card').should('have.length', 1);
    });

    it('should display the correct title', () => {
      cy.get('.card-title').contains('Mouse cursor gradient tracking');
    });

    it('should display the correct code snippet', () => {
      cy.get('.card-code').contains('mouse-cursor-gradient-tracking');
    });

    it('should display a Codepen button', () => {
      cy.get('.codepen-btn').should('have.length', 1);
    });

    it('should display a recommendation list', () => {
      cy.get('.recommendation-list-title').should('have.length', 1);
    });
  });
});
