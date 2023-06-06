import { Action } from '@ngrx/store';

import * as IamActions from './iam.actions';
import { UserEntity } from './iam.models';
import { IAMSignUpState, initialIAMState, iamReducer } from './iam.reducer';

describe('Iam Reducer', () => {
  const createIamEntity = (id: string, name = ''): UserEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Iam actions', () => {
    it('loadIamSuccess should return the list of known Iam', () => {
      const iam = [
        createIamEntity('PRODUCT-AAA'),
        createIamEntity('PRODUCT-zzz'),
      ];
      const action = IamActions.loadUserSuccess({ iam });

      const result: IAMSignUpState = iamReducer(initialIAMState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
