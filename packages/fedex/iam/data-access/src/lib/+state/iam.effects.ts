import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap, mergeMap } from 'rxjs';
import { IdentityAccessManagementService } from '../api/iam.service';
import {
  initSignIn,
  initSignUp,
  signInFailure,
  signInSuccess,
} from './iam.actions';
import { signUpSuccess } from './iam.actions';
import { signUpFailure } from './iam.actions';
import { Router } from '@angular/router';

@Injectable()
export class IamEffects {
  private readonly actions$ = inject(Actions);
  private readonly identityManagementAccessService = inject(
    IdentityAccessManagementService
  );
  private readonly router = inject(Router);

  readonly userSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initSignUp),
      switchMap(({ email, firstName, lastName, password }) =>
        this.identityManagementAccessService
          .signup({ email, firstName, lastName, password })
          .pipe(
            switchMap(() => {
              return of(
                signUpSuccess({
                  user: {
                    id: '001',
                    email,
                    firstName,
                    lastName,
                  },
                })
              );
            }),
            catchError((error) => {
              console.error('Error', error);
              return of(signUpFailure({ error }));
            })
          )
      )
    )
  );

  readonly userSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initSignIn),
      mergeMap(({ email, password }) =>
        this.identityManagementAccessService.signin({ email, password }).pipe(
          switchMap(() => {
            return of(
              signInSuccess({
                user: {
                  id: '001',
                  email,
                  firstName: 'John',
                  lastName: 'Doe',
                },
              })
            );
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(signInFailure({ error }));
          })
        )
      )
    )
  );

  onValidUserAccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signUpSuccess, signInSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      );
    },
    { dispatch: false }
  );
}
