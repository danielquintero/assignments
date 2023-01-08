import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHARACTERS_FEATURE_KEY,
  CharactersState,
  charactersAdapter,
} from './characters.reducer';

// Lookup the 'Characters' feature state managed by NgRx
export const selectCharactersState = createFeatureSelector<CharactersState>(
  CHARACTERS_FEATURE_KEY
);

const { selectAll, selectEntities } = charactersAdapter.getSelectors();

export const selectCharactersLoaded = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.loaded
);

export const selectCharactersError = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.error
);

export const selectAllCharacters = createSelector(
  selectCharactersState,
  (state: CharactersState) => selectAll(state)
);

export const selectCharactersMetadata = createSelector(
  selectCharactersState,
  (state: CharactersState) => ({
    total_records: state.total_records,
    total_pages: state.total_pages,
    next: state.next,
    previous: state.previous,
  })
);

export const selectCharactersEntities = createSelector(
  selectCharactersState,
  (state: CharactersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCharactersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
