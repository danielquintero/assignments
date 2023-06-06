import { UserEntity } from './iam.models';
import {
  IAMAdapter,
  IAMSignUpPartialState,
  initialIAMState,
} from './iam.reducer';
import * as IamSelectors from './iam.selectors';

describe('Iam Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getIamId = (it: UserEntity) => it.id;
  const createIamEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UserEntity);

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
          error: ERROR_MSG,
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

      expect(result).toBe(ERROR_MSG);
    });
  });
});
