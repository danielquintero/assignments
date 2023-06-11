import { CharacterDetailsDto, CharacterListDto } from '../character-dto';

// Map DTO's to FE entities
export type CharacterList = Pick<CharacterListDto, 'results'>;
export type CharacterListRecords = CharacterListDto['total_records'];
export type CharacterListTotalPages = CharacterListDto['total_pages'];
export type CharacterListNextPreviousPage = Pick<
  CharacterListDto,
  'next' | 'previous'
>;
export type Character = Pick<
  CharacterDetailsDto['result'],
  'description' | 'properties' | 'uid'
>;
export type CharacterProperties = CharacterDetailsDto['result']['properties'];
/**
 * Interface for the 'Characters' data
 */
export interface CharactersEntity {
  id: string;
  uid: string;
  properties?: CharacterProperties;
  description?: string;
  name?: string;
  url?: string;
}
