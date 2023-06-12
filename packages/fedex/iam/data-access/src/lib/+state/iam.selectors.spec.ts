import { UserEntity } from './iam.models';
import {
  IAMAdapter,
  IAMSignUpPartialState,
  initialIAMState,
} from './iam.reducer';
import * as IamSelectors from './iam.selectors';
import { createHttpErrorResponse } from '@challenges/shared-util-test-data';

describe('Iam Selectors', () => {
  const getIamId = (it: UserEntity) => it.id;
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

  let state: IAMSignUpPartialState;

  beforeEach(() => {
    state = {
      iam: IAMAdapter.setAll(
        [
          createIamEntity('PRODUCT-AAA'),
          createIamEntity('PRODUCT-BBB'),
          createIamEntity('PRODUCT-CCC'),
        ],
        {
          ...initialIAMState,
          selectedId: 'PRODUCT-BBB',
          error: createHttpErrorResponse(
            400,
            'Bad Request',
            'http://localhost:3333/api/v1/iam/signup',
            { errors: ['Email already exists'] }
          ),
          loaded: true,
        }
      ),
    };
  });

  describe('Iam Selectors', () => {
    it('selectAllIam() should return the list of Iam', () => {
      const results = IamSelectors.selectAllIam(state);
      const selId = getIamId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = IamSelectors.selectEntity(state) as UserEntity;
      const selId = getIamId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectIamLoaded() should return the current "loaded" status', () => {
      const result = IamSelectors.selectIamLoaded(state);

      expect(result).toBe(true);
    });

    it('selectIamError() should return the current "error" state', () => {
      const result = IamSelectors.selectIamError(state);
      console.log(result);
      expect(result).toBe('Email already exists');
    });
  });
});
