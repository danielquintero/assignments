import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { CharactersApiService } from '../characters-api.service';
import * as CharactersActions from './characters.actions';
import * as CharactersFeature from './characters.reducer';

import { switchMap, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private charcterApiService = inject(CharactersApiService);

  readonly loadPageCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // CharactersActions.initCharacters,
        CharactersActions.loadPageCharacters
      ),
      switchMap(({ page }) =>
        this.charcterApiService.getCharacterList(page).pipe(
          switchMap(
            ({ results, total_records, total_pages, previous, next }) => {
              return of(
                CharactersActions.loadCharactersSuccess({
                  total_records,
                  total_pages,
                  previous,
                  next,
                  characters: results.map((result) => ({
                    ...result,
                    id: result.uid,
                  })),
                })
              );
            }
          )
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(CharactersActions.loadCharactersFailure({ error }));
      })
    )
  );
  readonly loadCharacterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacterDetails),
      switchMap(({ id }) =>
        this.charcterApiService.getOneCharacter(id).pipe(
          switchMap(({ result }) => {
            return of(
              CharactersActions.loadCharacterDetailsSuccess({
                character: { ...result, id: result.uid },
              })
            );
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(CharactersActions.loadCharacterDetailsFailure({ error }));
      })
    )
  );
  readonly loadCharacterDetailsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CharactersActions.loadCharacterDetailsSuccess),
        tap(({ character }) =>
          this.router.navigate([`/dashboard/character-details/${character.id}`])
        )
      );
    },
    { dispatch: false }
  );
}
