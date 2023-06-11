import { makeServer } from '@fedex/shared/util-mock-server';
import { Server } from 'miragejs';
import { getGreeting } from '../support/app.po';

describe('sign up page', () => {
	let server: Server;

	beforeEach(() => {
		server = makeServer({ environment: 'test' });

		cy.visit('/');
		cy.get('.fedex-iam-signin-start-trial').click();
	});

	afterEach(() => {
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
			cy.get('[data-test-id=first-name-errors]').should('exist').should('contain.text', 'required');

			cy.get('#password').clear().type('lalalala');
			cy.get('[data-test-id=password-errors]')
				.should('exist')
				.should(
					'contain.text',
					'should contain at least one lower, upper, digit and symbol character',
				);
		});

		it('can submit a valid form', () => {
			cy.get('[data-cy=submit]').should('be.enabled');
		});
	});
});
