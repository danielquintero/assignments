import { Route } from '@angular/router';
import { CharactersContainer } from './characters.container';
import { CharactersOverviewComponent } from './characters-overview.component';
import { CharacterDetailsComponent } from './character-details.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromCharacters from './+state/characters.reducer';
import { CharactersEffects } from './+state/characters.effects';

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
        fromCharacters.CHARACTERS_FEATURE_KEY,
        fromCharacters.charactersReducer
      ),
      provideEffects(CharactersEffects),
    ],
  },
];
