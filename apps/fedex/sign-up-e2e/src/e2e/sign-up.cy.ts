import { makeServer } from '@challenges/shared-util-mocking';
import { Server } from 'miragejs';
import { getGreeting } from '../support/app.po';

describe('sign up page', () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });

    cy.visit('/');
  });

  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500).then(() => {
      server.shutdown();
    });
  });

  it('should display signup message', () => {
    getGreeting('h2').contains('Create a new account');
  });

  describe('signup form', () => {
    beforeEach(() => {
      cy.get('#firstName').type('jhon');
      cy.get('#lastName').type('doe');
      cy.get('#email').type('jhon.doe@email.com');
      cy.get('#password').type('S#p3Rs3CR3tp4Ssw0rD');
    });
    it('it displays form validation', () => {
      cy.get('#firstName').clear();
      cy.get('[data-testid=first-name-errors]')
        .should('exist')
        .should('contain.text', 'required');

      cy.get('#password').clear();
      cy.get('#password').type('lalalala');
      cy.get('[data-testid=password-errors]')
        .should('exist')
        .should(
          'contain.text',
          'should contain at least one lower, upper, digit and symbol character'
        );
    });

    it('can submit a valid form', () => {
      cy.get('[data-testid=submit]').should('be.enabled');
    });
  });
});
