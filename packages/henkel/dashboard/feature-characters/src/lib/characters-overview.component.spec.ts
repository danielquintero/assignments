import { RouterTestingModule } from '@angular/router/testing';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { characters } from '@challenges/shared-util-test-data';
import { CharactersOverviewComponent } from './characters-overview.component';

describe('FeatureCharactersComponent', () => {
  let spectator: Spectator<CharactersOverviewComponent>;
  let store: MockStore;

  const createComponent = createRoutingFactory({
    component: CharactersOverviewComponent,
    declareComponent: false,
    providers: [
      provideMockStore({
        initialState: {
          characters,
        },
      }),
      RouterTestingModule,
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.inject(MockStore);
  });

  it('should render a list of 10 items', () => {
    spectator.detectChanges();
    expect(
      spectator.queryAll('[data-test="character-overview-list"] li').length
    ).toBe(10);
  });
});
