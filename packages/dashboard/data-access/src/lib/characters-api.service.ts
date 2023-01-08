import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDetailsDto, CharacterListDto } from './character-dto';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
	private readonly endpoint: string = 'https://www.swapi.tech/api'

  constructor(private readonly http: HttpClient) { }

  getCharacterList(page?: number): Observable<CharacterListDto> {
    const url = page ? `${this.endpoint}/people?page=${page}&limit=10` : `${this.endpoint}/people`
		return this.http.get<CharacterListDto>(url);
	}

  getOneCharacter(id: string): Observable<CharacterDetailsDto> {
    return this.http.get<CharacterDetailsDto>(`${this.endpoint}/people/${id}`);
  }

}
