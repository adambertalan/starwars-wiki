import { Character } from './Character.model';
import { SWApiResult } from './SWApiResult.model';

export interface CharactersSearchResult extends SWApiResult {
    results: Character[];
}