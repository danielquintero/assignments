import { Spectator, createRoutingFactory } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharactersSelector } from '@challenges/henkle-dashboard-data-access';
import { charactersWithDetail } from '@challenges/shared/utils/test-data';
import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let spectator: Spectator<CharacterDetailsComponent>;
  let store: MockStore;

  const createComponent = createRoutingFactory({
    component: CharacterDetailsComponent,
    declareComponent: false,
    providers: [
      provideMockStore({
        initialState: {
          characters: charactersWithDetail,
        },
        selectors: [
          {
            selector: CharactersSelector.selectAllCharacters,
            value: charactersWithDetail.entities,
          },
          {
            selector: CharactersSelector.selectEntity,
            value: charactersWithDetail.entities[2],
          },
        ],
      }),
      RouterTestingModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.inject(MockStore);
  });

  it('should have the selected entity', () => {
    expect(
      spectator.query('[data-test="character-details-name"]')
    ).toContainText(charactersWithDetail.entities[2].name);
  });
});
