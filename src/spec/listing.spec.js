/* eslint-disable cypress/no-unnecessary-waiting */
/* Waiting times necessary for some slow redirect sequences */
import literals from 'lang/en/listing';

describe('Listing', () => {
  before(() => {
    cy.visit('http://localhost:9000/list/p/1');
  });

  it('should display the correct title', () => {
    cy.get('.page-title').contains(literals.snippetList);
  });

  it('should display snippets', () => {
    cy.get('.preview-card').its('length').should('gte', 1);
  });

  it('should display the appropriate controls', () => {
    cy.get('.sorter').should('have.length', 1);
    cy.get('.paginator').should('have.length', 1);
  });

  describe('navigating to the next page', () => {
    before(() => {
      cy.get('.next-page').first().click();
    });

    it('should redirect to the next page', () => {
      cy.url().should('contain', '/list/p/2');
    });

    describe('when navigating to the previous page', () => {
      before(() => {
        cy.get('.previous-page').first().click();
      });

      it('should redirect to the previous page', () => {
        cy.url().should('contain', 'list/p/1');
      });
    });
  });

  describe('sorting is changed', () => {
    before(() => {
      cy.get('.order-btn').first().click();
      cy.get('.order-btn').contains(literals.orders.alphabetical).click();
    });

    it('should redirect to the sorted listing', () => {
      cy.url().should('contain', '/list/a/1');
    });

    it('should update the sorter', () => {
      cy.get('.order-btn.selected').contains(literals.orders.alphabetical);
    });
  });

  describe('clicking a snippet', () => {
    before(() => {
      cy.get('.card-title a').first().click();
    });

    it('should display the correct breadcrumbs', () => {
      cy.get('.link-back').contains(literals.snippetList);
    });

    describe('returning to listing', () => {
      before(() => {
        cy.get('.link-back').first().click();
      });

      it('should return to the last listing page', () => {
        cy.url().should('contain', '/list');
      });
    });
  });

  describe('navigating to a category listing', () => {
    before(() => {
      cy.get('.order-btn').first().click();
      cy.get('.order-btn').contains(literals.orders.expertise).click();
      cy.wait(1500);
      cy.get('.listing-anchor.icon-php').first().click();
    });

    it('should redirect to the category listing page', () => {
      cy.url().should('contain', 'php/e/1');
    });

    describe('clicking a snippet', () => {
      before(() => {
        cy.get('.card-title a').first().click();
      });

      it('should display the correct breadcrumbs', () => {
        cy.get('.link-back').contains('PHP');
      });

      describe('returning to category listing', () => {
        before(() => {
          cy.get('.link-back').first().click();
        });

        it('should return to the category listing page', () => {
          cy.url().should('contain', '/php/e/1');
        });
      });
    });

    describe('navigating to a tag listng', () => {
      before(() => {
        cy.get('.order-btn').first().click();
        cy.get('.order-btn').contains(literals.orders.popularity).click();
        cy.wait(1500);
        cy.get('.listing-anchors a').contains('Array').first().click();
      });

      it('should redirect to the tag listing page', () => {
        cy.url().should('contain', 'php/t/array/p/1');
      });

      describe('clicking a snippet', () => {
        before(() => {
          cy.get('.card-title a').first().click();
        });

        it('should display the correct breadcrumbs', () => {
          cy.get('.link-back.has-more').contains('PHP');
          cy.get('.link-back-more').contains('Array');
        });
      });
    });
  });
});
