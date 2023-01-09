import { RouterTestingModule } from '@angular/router/testing';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CharactersOverviewComponent } from './characters-overview.component';

describe('FeatureCharactersComponent', () => {
  let spectator: Spectator<CharactersOverviewComponent>;
  let store: MockStore;

  const entities = {
    '1': {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
      id: '1',
    },
    '2': {
      uid: '2',
      name: 'C-3PO',
      url: 'https://www.swapi.tech/api/people/2',
      id: '2',
    },
    '3': {
      uid: '3',
      name: 'R2-D2',
      url: 'https://www.swapi.tech/api/people/3',
      id: '3',
    },
    '4': {
      uid: '4',
      name: 'Darth Vader',
      url: 'https://www.swapi.tech/api/people/4',
      id: '4',
    },
    '5': {
      uid: '5',
      name: 'Leia Organa',
      url: 'https://www.swapi.tech/api/people/5',
      id: '5',
    },
    '6': {
      uid: '6',
      name: 'Owen Lars',
      url: 'https://www.swapi.tech/api/people/6',
      id: '6',
    },
    '7': {
      uid: '7',
      name: 'Beru Whitesun lars',
      url: 'https://www.swapi.tech/api/people/7',
      id: '7',
    },
    '8': {
      uid: '8',
      name: 'R5-D4',
      url: 'https://www.swapi.tech/api/people/8',
      id: '8',
    },
    '9': {
      uid: '9',
      name: 'Biggs Darklighter',
      url: 'https://www.swapi.tech/api/people/9',
      id: '9',
    },
    '10': {
      uid: '10',
      name: 'Obi-Wan Kenobi',
      url: 'https://www.swapi.tech/api/people/10',
      id: '10',
    },
  };

  const createComponent = createRoutingFactory({
    component: CharactersOverviewComponent,
    providers: [
      provideMockStore({
        initialState: {
          characters: {
            ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            entities,
            loaded: true,
            total_records: 82,
            total_pages: 9,
            previous: null,
            next: 'https://www.swapi.tech/api/people?page=2&limit=10',
            error: null,
            selectedId: '2',
          },
        },
      }),
      RouterTestingModule,
    ],
    detectChanges: false
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
