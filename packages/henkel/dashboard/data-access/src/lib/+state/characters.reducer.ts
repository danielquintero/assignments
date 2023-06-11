import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CharactersActions from './characters.actions';
import {
  CharacterListNextPreviousPage,
  CharacterListRecords,
  CharacterListTotalPages,
  CharactersEntity,
} from './characters.models';

export const CHARACTERS_FEATURE_KEY = 'characters';

export interface CharactersState extends EntityState<CharactersEntity> {
  selectedId?: string | number; // which Characters record has been selected
  loaded: boolean; // has the Characters list been loaded
  error?: string | null; // last known error (if any)
  total_records: CharacterListRecords | null;
  total_pages: CharacterListTotalPages | null;
  previous: CharacterListNextPreviousPage['previous'];
  next: CharacterListNextPreviousPage['next'];
}

export interface CharactersPartialState {
  readonly [CHARACTERS_FEATURE_KEY]: CharactersState;
}

export const charactersAdapter: EntityAdapter<CharactersEntity> =
  createEntityAdapter<CharactersEntity>();

export const initialCharactersState: CharactersState =
  charactersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    total_records: null,
    total_pages: null,
    previous: null,
    next: null,
  });

const reducer = createReducer(
  initialCharactersState,
  on(CharactersActions.initCharacters, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharactersActions.loadPageCharacters, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    CharactersActions.loadCharactersSuccess,
    (state, { characters, total_records, total_pages, previous, next }) =>
      charactersAdapter.setAll(characters, {
        ...{ ...state, total_records, total_pages, previous, next },
        loaded: true,
      })
  ),
  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CharactersActions.loadCharacterDetails, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character }) =>
    charactersAdapter.upsertOne(character, {
      ...state,
      loaded: true,
      selectedId: character.uid,
    })
  ),
  on(CharactersActions.loadCharacterDetailsFailure, (state) => ({
    ...state,
    loaded: false,
    error: null,
  }))
);

export function charactersReducer(
  state: CharactersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
