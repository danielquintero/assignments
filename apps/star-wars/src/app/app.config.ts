import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    // alternative to `StoreModule.forRoot`
    provideStore({ router: routerReducer }),
    // alternative to `StoreRouterConnectingModule.forRoot`
    provideRouterStore(),
    // alternative to `StoreDevtoolsModule.instrument`
    provideStoreDevtools(),
    // alternative to `EffectsModule.forRoot`
    // provideEffects([RouterEffects, AuthEffects]),
  ],
};
