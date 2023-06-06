import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectEntity } from '@challenges/fedex-iam-data-access';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';

export const isAuthorizedGuard: CanActivateFn = (route, state) => {
  console.log('isAuthorizedGuard: ', route, state);
  const router = inject(Router);
  const store = inject(Store);

  const userProfile$ = store.select(selectEntity);
  return userProfile$.pipe(
    switchMap((user) =>
      user ? of(true) : of(false) && router.navigate(['iam/sign-up'])
    )
  );
};
