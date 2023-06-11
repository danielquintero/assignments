import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { CharactersApiService } from './characters-api.service';

describe('CharactersApiService', () => {
  let spectator: SpectatorHttp<CharactersApiService>;
  const createHttp = createHttpFactory(CharactersApiService);

  beforeEach(() => (spectator = createHttp()));

  it('getCharacterList should send request to load items for a page', () => {
    spectator.service.getCharacterList().subscribe();
    spectator.expectOne('https://www.swapi.tech/api/people', HttpMethod.GET);
    spectator.service.getCharacterList(3).subscribe();
    spectator.expectOne(
      'https://www.swapi.tech/api/people?page=3&limit=10',
      HttpMethod.GET
    );
  });
});
