/* eslint-disable cypress/no-unnecessary-waiting */
/* Waiting times necessary for some slow redirect sequences */
import literals from 'lang/en/listing';
import clientLiterals from 'lang/en/client/common';

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
    cy.get('.paginator').should('have.length', 1);
  });

  describe('navigating to the next page', () => {
    before(() => {
      cy.visit('http://localhost:9000/list/p/1');
      // eslint-disable-next-line cypress/no-force
      cy.get('.next-page').first().click({ force: true });
    });

    it('should redirect to the next page', () => {
      cy.url().should('contain', '/list/p/2');
    });

    describe('when navigating to the previous page', () => {
      before(() => {
        // eslint-disable-next-line cypress/no-force
        cy.get('.previous-page').first().click({ force: true });
      });

      it('should redirect to the previous page', () => {
        cy.url().should('contain', 'list/p/1');
      });
    });
  });

  describe('clicking a snippet', () => {
    before(() => {
      cy.visit('http://localhost:9000/list/p/1');
      cy.get('.card-title a').first().click();
    });

    it('should display the correct breadcrumbs', () => {
      cy.get('.breadcrumbs').contains(clientLiterals.home);
    });

    after(() => {
      cy.get('.breadcrumb-item a').first().click();
    });
  });

  describe('navigating to a category listing', () => {
    before(() => {
      cy.visit('http://localhost:9000/css/p/1');
    });

    describe('clicking a snippet', () => {
      before(() => {
        cy.get('.card-title a').eq(3).click();
      });

      it('should display the correct breadcrumbs', () => {
        cy.get('.breadcrumbs').contains('CSS');
      });

      describe('returning to category listing', () => {
        before(() => {
          cy.get('.breadcrumb-item').eq(1).click();
        });

        it('should return to the category listing page', () => {
          cy.url().should('contain', '/css/p/1');
        });
      });
    });

    describe('navigating to a tag listng', () => {
      before(() => {
        cy.get('.order-btn').first().click();
        cy.get('.order-btn').contains(literals.orders.expertise).click();
        cy.wait(1500);
        cy.get('.listing-anchors a').contains('Animation').first().click();
      });

      it('should redirect to the tag listing page', () => {
        cy.url().should('contain', 'css/t/animation/e/1');
      });

      describe('clicking a snippet', () => {
        before(() => {
          cy.get('.card-title a').first().click();
        });

        it('should display the correct breadcrumbs', () => {
          cy.get('.breadcrumbs').contains('CSS');
          cy.get('.breadcrumbs').contains('Animation');
        });
      });
    });
  });

  describe('with sorting controls', () => {
    before(() => {
      cy.visit('http://localhost:9000/js/p/1');
    });

    it('should display the appropriate controls', () => {
      cy.get('.sorter').should('have.length', 1);
    });

    describe('sorting is changed', () => {
      before(() => {
        cy.get('.order-btn').first().click();
        cy.get('.order-btn').contains(literals.orders.alphabetical).click();
      });

      it('should redirect to the sorted listing', () => {
        cy.url().should('contain', '/js/a/1');
      });

      it('should update the sorter', () => {
        cy.get('.order-btn.selected').contains(literals.orders.alphabetical);
      });
    });
  });
});
