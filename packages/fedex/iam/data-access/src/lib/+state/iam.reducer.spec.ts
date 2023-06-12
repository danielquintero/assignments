import { Action } from '@ngrx/store';

import * as IamActions from './iam.actions';
import { UserEntity } from './iam.models';
import { IAMState, initialIAMState, iamReducer } from './iam.reducer';
import { createHttpErrorResponse } from '@challenges/shared-util-test-data';

describe('IAM Reducer', () => {
  const createIamEntity = (
    id: string,
    firstName = '',
    lastName = '',
    email = '',
    isActive = true
  ): UserEntity => ({
    id,
    firstName: firstName || `firstName-${id}`,
    lastName: lastName || `lastName-${id}`,
    email: email || `${firstName}.${lastName}-@email.com`,
    isActive,
  });

  describe('valid IAM actions', () => {
    it('signUpSuccess should return the user', () => {
      const user = createIamEntity('001');
      const action = IamActions.signUpSuccess({ user });

      const result: IAMState = iamReducer(initialIAMState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
      expect(result.selectedId).toBe(user.id);
    });
    it('signUpFailure should return an error', () => {
      const error = createHttpErrorResponse(
        400,
        'Bad Request',
        'http://localhost:3333/api/v1/iam/signup',
        { errors: ['Email already exists'] }
      );
      const action = IamActions.signUpFailure({ error });

      const result: IAMState = iamReducer(initialIAMState, action);

      expect(result.loaded).toBe(false);
      expect(result.ids.length).toBe(0);
      expect(result.error?.error.errors.includes('Email already exists')).toBe(
        true
      );
      expect(result.selectedId).toBe(undefined);
    });
    it('signInSuccess should return the user', () => {
      const user = createIamEntity('001');
      const action = IamActions.signInSuccess({ user });

      const result: IAMState = iamReducer(initialIAMState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
      expect(result.selectedId).toBe(user.id);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = iamReducer(initialIAMState, action);

      expect(result).toBe(initialIAMState);
    });
  });
});
