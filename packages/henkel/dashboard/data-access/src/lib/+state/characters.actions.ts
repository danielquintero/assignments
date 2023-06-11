import { createAction, props } from '@ngrx/store';
import {
  CharacterListNextPreviousPage,
  CharacterListRecords,
  CharacterListTotalPages,
  CharactersEntity,
} from './characters.models';

export const initCharacters = createAction('[Characters Page] Init');
export const loadPageCharacters = createAction(
  '[Characters Page] Load Page Characters',
  props<{ page?: number | undefined }>()
);

/**
 * plurarl
 */
export const loadCharactersSuccess = createAction(
  '[Characters/API] Load Characters Success',
  props<{
    characters: CharactersEntity[];
    total_records: CharacterListRecords;
    total_pages: CharacterListTotalPages;
    next: CharacterListNextPreviousPage['next'];
    previous: CharacterListNextPreviousPage['previous'];
  }>()
);
export const loadCharactersFailure = createAction(
  '[Characters/API] Load Characters Failure',
  props<{ error: any }>()
);

/* Singular */
export const loadCharacterDetails = createAction(
  '[Characters Page] Load Character Details',
  props<{ id: string }>()
);
export const loadCharacterDetailsSuccess = createAction(
  '[Characters/API] Load Character Success',
  props<{ character: CharactersEntity }>()
);
export const loadCharacterDetailsFailure = createAction(
  '[Characters/API] Load Character Failure',
  props<{ error: any }>()
);
