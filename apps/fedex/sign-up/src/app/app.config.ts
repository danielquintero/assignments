import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import {
  IAM_FEATURE_KEY,
  IamEffects,
  iamReducer,
} from '@challenges/fedex-iam-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      router: routerReducer,
      [IAM_FEATURE_KEY]: iamReducer,
    }),
    provideEffects(IamEffects),
    importProvidersFrom(HttpClientModule),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideRouter(routes, withDebugTracing()),
  ],
};

console.log('Environment: ', environment);
