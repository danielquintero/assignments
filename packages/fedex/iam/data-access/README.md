# fedex-iam-data-access

This library takes care of the data, services, models/types and state management for the Identity Access Management domain.

- NgRx is used for the state management.
- `./src/lib/dto/index.ts` exposes the model response payload from the Backend
- `./src/lib/+state/iam.models.ts` expose types for different frontend entitities such SignUp, SignIn etc

## Running unit tests

Run `nx test fedex-iam-data-access` to execute the unit tests.

## Running lint

Run `nx lint fedex-iam-data-access` to lint.
