import { Route } from '@angular/router';
import { CharactersContainer } from './characters.container';
import { CharactersOverviewComponent } from './characters-overview.component';
import { CharacterDetailsComponent } from './character-details.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CharactersEffects, CharactersReducer } from '@challenges/dashboard/data-access';

export const dashboardFeatureCharactersRoutes: Route[] = [
  {
    path: '',
    component: CharactersContainer,
    children: [
      { path: '', component: CharactersOverviewComponent },
      { path: 'character-details/:name', component: CharacterDetailsComponent },
    ],
    providers: [
      provideState(
        CharactersReducer.CHARACTERS_FEATURE_KEY,
        CharactersReducer.charactersReducer
      ),
      provideEffects(CharactersEffects),
    ],
  },
];
