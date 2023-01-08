import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CharactersActions from './characters.actions';
import { CharactersEffects } from './characters.effects';

describe('CharactersEffects', () => {
  let actions: Observable<Action>;
  let effects: CharactersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CharactersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CharactersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CharactersActions.initCharacters() });

      const expected = hot('-a-|', {
        a: CharactersActions.loadCharactersSuccess({ characters: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
