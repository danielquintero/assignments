/**
 * Ideally we have generated types from BE DTO specs i.e.(openAPI), and then in the FE we map those to the correct entities
 * The following is an example of this technique
 */
export interface CharacterListDto {
  message: string;
  total_records: number;
  total_pages: number;
  previous: null | string;
  next: null | string;
  results: Array<{
    uid: string;
    name: string;
    url: string;
  }>;
}
export interface CharacterDetailsDto {
  message: string;
  result: {
    properties: {
      height: string;
      mass: string;
      hair_color: string;
      skin_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      created: string;
      edited: string;
      name: string;
      homeworld: string;
      url: string;
    };
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}
