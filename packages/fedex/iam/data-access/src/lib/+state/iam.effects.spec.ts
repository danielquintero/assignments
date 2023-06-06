import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as IamActions from './iam.actions';
import { IamEffects } from './iam.effects';

describe('IamEffects', () => {
  let actions: Observable<Action>;
  let effects: IamEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        IamEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(IamEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: IamActions.initSignup() });

      const expected = hot('-a-|', {
        a: IamActions.loadUserSuccess({ iam: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
