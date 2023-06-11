import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectEntity } from '@challenges/fedex-iam-data-access';
import { Store } from '@ngrx/store';
import { mergeMap, of, tap } from 'rxjs';

export const isAuthorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const userProfile$ = store.select(selectEntity);
  return userProfile$.pipe(
    tap((user) => {
      if (!user) {
        console.log(
          `User is not authorized, you are being redirected to gain access.`
        );
        router.navigate(['/iam/sign-up']);
      }
    }),
    mergeMap((user) => (user ? of(true) : of(false)))
  );
};
