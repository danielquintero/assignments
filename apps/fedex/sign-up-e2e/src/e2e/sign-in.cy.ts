import { AppRegistry, makeServer } from '@challenges/shared-util-mocking';
import { Server } from 'miragejs';
import { getGreeting } from '../support/app.po';

describe('sign in page', () => {
  let server: Server<AppRegistry>;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });

    cy.visit('/iam/sign-in');
  });

  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500).then(() => {
      server.shutdown();
    });
  });

  it('should display sign in message', () => {
    getGreeting('h2').contains('Sign in to your account');
  });

  describe('signin form', () => {
    beforeEach(() => {
      cy.get('#email').type('jhon.doe@email.com');
      cy.get('#password').type('S#p3Rs3CR3tp4Ssw0rD');
    });

    it('it displays form validation', () => {
      cy.get('#email').clear();
      cy.get('[data-testid=email-errors]')
        .should('exist')
        .should('contain.text', 'required');

      cy.get('#password').clear();
      cy.get('[data-testid=password-errors]')
        .should('exist')
        .should('contain.text', 'required');
    });

    it('can submit a valid form', () => {
      cy.get('[data-testid=submit]').should('be.enabled').click();
    });

    it('gives user feedback when signin fails', () => {
      cy.get('[data-testid="submit"]').click();
      cy.get('[data-testid="signin-errors"]')
        .should('exist')
        .should(
          'contain.text',
          'We could not sign you in. Please try again with the correct email and password combination.'
        );
    });

    it('navigates to route when signin succeeds', () => {
      server.create('user', {
        firstName: 'Jhon',
        lastName: 'doe',
        email: `jhon.doe@email.com`,
        password: 'S#p3Rs3CR3tp4Ssw0rD',
      });

      cy.get('[data-testid=submit]').should('be.enabled').click();

      cy.url().should('include', '/dashboard');
    });
  });
});
