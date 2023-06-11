import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as IamActions from './iam.actions';
import { IamEffects } from './iam.effects';
import { UserProfile, UserSignIn, UserSignUp } from './iam.models';
import { IdentityAccessManagementService } from '../api/iam.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('IamEffects', () => {
  let actions: Observable<unknown>;
  let effects: IamEffects;
  let iamApiService: IdentityAccessManagementService;

  const iamApiServiceMock = jest.fn<
    Partial<IdentityAccessManagementService>,
    []
  >(() => ({
    signup: jest.fn(),
    signin: jest.fn(),
  }));

  const createUserProfileEntity = (
    id: string,
    firstName = '',
    lastName = '',
    email = '',
    isActive = true
  ) =>
    ({
      id,
      firstName: firstName || `firstName-${id}`,
      lastName: lastName || `lastName-${id}`,
      email: email || `${firstName}.${lastName}-@email.com`,
      isActive: isActive,
    } as UserProfile);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        IamEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: IdentityAccessManagementService,
          useValue: iamApiServiceMock(),
        },
      ],
    });

    effects = TestBed.inject(IamEffects);
    iamApiService = TestBed.inject(IdentityAccessManagementService);
  });

  describe('signupUser$', () => {
    it('should return an signUpSuccess action, with the user, on success', () => {
      const { firstName, lastName, email } =
        createUserProfileEntity('USER-AAA');
      const user: UserSignUp = {
        email,
        firstName,
        lastName,
        password: 'Sup3RS3cr3TP4ssw0rd',
      };
      const action = IamActions.initSignUp(user);
      const outcome = IamActions.signUpSuccess({
        user: { email, firstName, lastName, id: '001' },
      });

      actions = hot('-a-|', { a: action });
      const response = cold('a|', { a: user });
      const expected = cold('-a-|', {
        a: outcome,
      });
      jest.spyOn(iamApiService, 'signup').mockReturnValue(response);

      expect(effects.userSignUp$).toBeObservable(expected);
    });
    it('should return signUpFailure action, with an error, on failure', () => {
      // Arrange
      const { email, firstName, lastName } =
        createUserProfileEntity('USER-AAA');
      const signUpPayload: UserSignUp = {
        email: email,
        firstName,
        lastName,
        password: 'Sup3RS3cr3TP4ssw0rd',
      };
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Error',
        url: 'https://demo-api.now.sh/users/signin',
        error: { message: 'Error' },
      });
      const action = IamActions.initSignUp(signUpPayload);
      const outcome = IamActions.signUpFailure({
        error,
      });

      // Act
      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b|)', {
        b: outcome,
      });
      jest.spyOn(iamApiService, 'signup').mockReturnValue(response);

      // Assert
      expect(effects.userSignUp$).toBeObservable(expected);
    });
  });

  describe('signinUser$', () => {
    it('should return signInSuccess action, with the user, on success', () => {
      // Arrange
      const { email, firstName, lastName, id } =
        createUserProfileEntity('USER-AAA');
      const signinPayload: UserSignIn = {
        email: email,
        password: 'Sup3RS3cr3TP4ssw0rd',
      };
      const action = IamActions.initSignIn(signinPayload);
      const outcome = IamActions.signInSuccess({
        user: { email, firstName: 'John', lastName: 'Doe', id: '001' },
      });

      // Act
      actions = hot('-a-|', { a: action });
      const response = cold('a|', {
        a: { id, firstName, lastName, email },
      });
      const expected = cold('-a-|', {
        a: outcome,
      });
      jest.spyOn(iamApiService, 'signin').mockReturnValue(response);

      // Assert
      expect(effects.userSignIn$).toBeObservable(expected);
    });
    it('should return signInFailure action, with an error, on failure', () => {
      // Arrange
      const { email } = createUserProfileEntity('USER-AAA');
      const signinPayload: UserSignIn = {
        email: email,
        password: 'Sup3RS3cr3TP4ssw0rd',
      };
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Error',
        url: 'https://demo-api.now.sh/users/signin',
        error: { message: 'Error' },
      });
      const action = IamActions.initSignIn(signinPayload);
      const outcome = IamActions.signInFailure({
        error,
      });

      // Act
      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b|)', {
        b: outcome,
      });
      jest.spyOn(iamApiService, 'signin').mockReturnValue(response);

      // Assert
      expect(effects.userSignIn$).toBeObservable(expected);
    });
  });
});
