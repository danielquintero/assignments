import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

// import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
