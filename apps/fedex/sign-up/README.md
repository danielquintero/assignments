<p align="center"><img src="https://logos-marcas.com/wp-content/uploads/2020/04/FedEx-Logo.png" width="450"></p>

# User sign up

I decided to use Nx monorepo for this code assessment because apart from offering A+ type support for Angular and it's environment I think it is a great tool for companies/products at scale.

## Overview & project setup

The user sign up application is a shell application. The shell application only takes care of bootstraping and loading the initial application modules, configurations etc. It leverages lazy loading of views via lazy loaded route modules (packages).

For the assessment, I kept in mind the requirements, mentioned above, I used the tools that I am more experienced with and I think have the best DX. Furthermore, I have used some extras to showcase how some organisational challenges e.g.(orchestration of frontend applications, design system, mocking, testing etc) can be addressed with proper tooling (NX monorepo, cypress, storybook, miragejs, ngspectator etc).

The application has one main protected/guarded route `/dashboard` which requires a user to be signed in. Unprotected routes are `/sign-in` and `/sign-up`. This assessment focused on the second one, where the logic/validation is implemented as requested. The other route allows a user to login to a "mocked" dashboard but it is outside the scope of the excersie and it's only there to give an idea of how the sign in could be implemented.

### Store

Ngrx is used as state management library. It is used with the library standards entity, adapters (insert, upsert, delete etc.)

### Styles

To quickly help put together some pleasing UI, I have used Tailwind CSS. I tried to make templates more readable by using `@apply` in `.inlineTemplateStyles` rather than clutter the templates with classes.

### Domain Driven Design

This is out of scope for the assessment but I thought it would be good to share how we could farily easy follow a DDD approach. Since Nx promotes building smaller pieces with high shareability we could generated clients i.e.(services, types etc) from Backend specifications (Swagger, OpenAPI) to enforce the correctness of our frontend applications in regards with the backend response payloads and also create this domain context within our frontend code.

The scenario for this example is simplified, but would not take much more effort to make it a real life example. `libs/shared/iam/data-access/src/lib/+state/iam.models.ts` shows how we can produce frontend library types from DTO types thanks to Typescript utility types. Besides inferring generated types, we can also generate entire clients (angular services) to fully rely on the Backend contract signature as I mentioned earlier.

### Mocking

[Miragejs](https://miragejs.com/) is a great library to mock requests for faster development. It stands out from many other mocking libraries because it allows to do some more complex mocking, you can basically think of miragejs as a persistent mocking library. I have set up an example of how we can use mirage with Angular both for test and for development. If you are curious how does this mocking server works in this app you can check `libs/shared/util-mock-server`.

### Requirements checklist

- Build a single page app with a sign-up form. ✅
- The form should allow users to enter first name, last name, email, and password. ✅
- All fields are required. ✅
- Password validation:
  - Should be a minimum of eight characters, ✅
  - Should contain lower and uppercase letters, ✅
  - Should not contain user’s first or last name. ✅
- Email should be validated but there are various ways of accomplishing this. So, show us what
  you consider as a proper email validation. ✅
- The form should send a POST request to <https://demo-api.now.sh/users>. ✅

Extras

- Showcase knowledge of domain driven architecture (DTO's, entities and feature & data-access libraries) ✅

### Getting started

- Make sure to install dependencies, run `npm install`
- For better dx you can install nx globally `npm i -g @nrwl/cli`, this will allow you to run any nx command from terminal. All possible nx commands are listed toward the end of this file.

### How to run the project

To run the sign up application simply run `nx serve sign-up`, make sure you have installed depedencies `npm i` beforehand.

### Test & lint targets

To run lint or unit test that are related to this assignment, you can simply run `nx run-many -t test --projects=fedex-\* --parallel --coverage` or `nx run-many --target=lint --projects=fedex-\* --parallel` for testing or linting every app/library, respectively.

Integration tests are also available for the features requested. You can run Cypress by `nx run-many -t e2e --projects=fedex-\* --parallel --watch`.

**_Tests coverage will be created under coverage folder (at the workspace root level) and will be organised per application/package_**

## Aproaching the assessment

### General knowledge

For the assessment, I kept in mind the requirements, mentioned above, I used the tools that I am more experienced with and I think have the best DX. Furthermore, I have used some extras to showcase how some organisational challenges e.g.(orchestration of frontend applications, design system, mocking, testing etc) can be addressed with proper tooling (NX monorepo, storybook, miragejs, ngspectator).

### Store

Ngrx is used as state management library. I implemented a facade abstraction layer to decouple stateful components/containers from an specific library implementation as well as to accomodate for a comprenhensible API.

### Styles

To quickly help put together some pleasing UI, I have used Tailwind CSS.

### Domain Driven Design

This is out of scope for the assessment but I thought would be good to share how we could follow a DDD approach, we could generated clients/types from Backend specifications (Swagger, OpenAPI) to enforce the correctness of our frontend applications.

The scenario for this example is simplified, but would not take much more effort to make it a real life example. `packages/fedex/iam/data-access/src/lib/dto/index.ts` and `packages/fedex/iam/data-access/src/lib/+state/iam.models.ts` shows how we can produce frontend library types from DTO types thanks to Typescript utility types. Besides inferring generated types, we can also generate entire clients (angular services) to fully rely on the Backend contract signature (OpenAPI).
