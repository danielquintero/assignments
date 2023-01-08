import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
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
}).catch((err) => console.error(err));
