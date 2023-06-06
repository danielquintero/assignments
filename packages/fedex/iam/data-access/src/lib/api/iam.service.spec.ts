import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';

import { IAMService as ServiceUnderTest } from './iam.service';

describe(ServiceUnderTest.name, () => {
  let spectator: SpectatorHttp<ServiceUnderTest>;
  let service: ServiceUnderTest;
  let endpointURL: string;

  const email = 'test@email.com';
  const password = 'password';
  const firstName = 'firstName';
  const lastName = 'lastName';

  const createHttp = createHttpFactory({
    service: ServiceUnderTest,
  });

  beforeEach(() => {
    spectator = createHttp();
    service = spectator.service;
    endpointURL = service['endpointURL'];
  });

  afterEach(() => spectator.controller.verify());

  it('signs in a user', () => {
    const { expectOne, flushAll } = spectator;

    service.signin({ email, password }).subscribe();

    const testRequest = expectOne(`${endpointURL}/signin`, HttpMethod.POST);
    flushAll([testRequest], [{}]);
  });
  it('signs up a user', () => {
    const { expectOne, flushAll } = spectator;

    service.signup({ email, password, firstName, lastName }).subscribe();

    const testRequest = expectOne(endpointURL, HttpMethod.POST);
    flushAll([testRequest], [{}]);
  });
});
