import { CharactersEntity } from './characters.models';
import {
  charactersAdapter,
  CharactersPartialState,
  initialCharactersState,
} from './characters.reducer';
import * as CharactersSelectors from './characters.selectors';

describe('Characters Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCharactersId = (it: CharactersEntity) => it.id;
  const createCharactersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CharactersEntity);

  let state: CharactersPartialState;

  beforeEach(() => {
    state = {
      characters: charactersAdapter.setAll(
        [
          createCharactersEntity('PRODUCT-AAA'),
          createCharactersEntity('PRODUCT-BBB'),
          createCharactersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCharactersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Characters Selectors', () => {
    it('selectAllCharacters() should return the list of Characters', () => {
      const results = CharactersSelectors.selectAllCharacters(state);
      const selId = getCharactersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CharactersSelectors.selectEntity(
        state
      ) as CharactersEntity;
      const selId = getCharactersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCharactersLoaded() should return the current "loaded" status', () => {
      const result = CharactersSelectors.selectCharactersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCharactersError() should return the current "error" state', () => {
      const result = CharactersSelectors.selectCharactersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
