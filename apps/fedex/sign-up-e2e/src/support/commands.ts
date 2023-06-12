// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
  interface ApplicationWindow {
    handleFromCypress(request: Request): Promise<[number, Headers, string]>;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.on('window:before:load', (win: Cypress.ApplicationWindow) => {
  win.handleFromCypress = function (
    request: Request & {
      requestBody: string;
      requestHeaders: Record<string, string>;
    }
  ) {
    return fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody,
    }).then((res: Response) => {
      const content = res.headers
        .get('content-type')
        .includes('application/json')
        ? res.json()
        : res.text();

      return new Promise((resolve) => {
        content.then((body) => resolve([res.status, res.headers, body]));
      });
    });
  };
});
