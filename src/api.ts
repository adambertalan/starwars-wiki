import { CharactersSearchResult } from './models/CharactersSearchResult.model';
import { Character } from "./models/Character.model";
import { Film } from "./models/Film.model";
import { Species } from "./models/Species.model";
import { SpeciesResult } from "./models/SpeciesResult.model";
import { URLString } from "./models/types";

/**
 * Loads a character using the given character ID from the swapi.
 * 
 * @param characterId the Character's ID whose data should be loaded
 * 
 * @throws Error when there was an error during API call
 * @returns Promise that resolves a single Character object
 */
export async function fetchCharacter(characterId: string): Promise<Character> {
    const res: Response = await fetch(`https://swapi.dev/api/people/${characterId}`);
    if (!res.ok) {
        throw new Error("Character not found!");
    }
    const characterResult: Character = await res.json();

    const character: Character = {
        ...characterResult,
        id: +characterId
    };

    return character;
};

/**
 * Loads the species names of a given Character.
 * 
 * The Character object contains a list of URLs that each represent
 * an individual species data. Using these URLs, this function loads
 * parallel all these data and returns only the name from each of them.
 * 
 * @param character the Character whose species names are needed
 * @returns Promise that resolves a list of species names
 */
export async function fetchSpeciesNamesOfCharacter(character: Character): Promise<string[]> {
    return Promise.all(
        character.species.map((speciesUrl: URLString) =>
            fetch(speciesUrl)
            .then(res => res.json())
            .then((s: Species) => s.name)
        )
    );
}

/**
 * Loads the film titles of a given Character.
 * 
 * The Character object contains a list of URLs that each represent
 * an individual film data. Using these URLs, this function loads
 * parallel all these data and returns only the title from each of them.
 * 
 * @param character the Character whose film titles are needed
 * @returns Promise that resolves a list of film titles
 */
export async function fetchFilmTitlesOfCharacter(character: Character): Promise<string[]> {
    return Promise.all(
        character.films.map((filmUrl: URLString) =>
            fetch(filmUrl)
            .then(res => res.json())
            .then((f: Film) => f.title)
        )
    );
}

/**
 * Loads a specific Species data given by the species ID.
 * 
 * @param speciesId the ID of the Species needed.
 * @returns Promise that resolves a single Species object
 */
export async function fetchSpecificSpecies(speciesId: string): Promise<Species> {
    const res: Response = await fetch(`https://swapi.dev/api/species/${speciesId}`);
    const speciesData: Species = await res.json();

    const match = /species\/(?<id>\d+)/g.exec(speciesData.url);

    return {
        ...speciesData,
        id: +(match?.groups?.id ?? '')
    }
}

/**
 * Loads a list of Characters that are all belongs to a given species.
 * 
 * @param species Species object which describes the character species needed
 * @returns Promise that resolves a list of Character objects
 */
export async function fetchCharactersOfSpecies(species: Species): Promise<Character[]> {
    return Promise.all(
        species.people.map((peopleUrl: URLString) =>
            fetch(peopleUrl)
            .then(res => res.json())
            .then((c: Character) => {
                const match = /people\/(?<id>\d+)/g.exec(c.url);
        
                return {
                    ...c,
                    id: +(match?.groups?.id ?? '')
                };
            })
        )
    );
}

/**
 * Loads a list of Species objects.
 * 
 * Without parameter, this function loads the first page of Species.
 * 
 * @param url the URL of the subsequent Species pages eg. https://swapi.dev/api/species/?page=2
 * @returns Promise that resolves to a SpeciesResult object that contains the list of Species as well as the URL to the next page
 */
export async function fetchSpecies(url: string = 'https://swapi.dev/api/species'): Promise<SpeciesResult> {
    const res: Response = await fetch(url);
    const speciesResult: SpeciesResult = await res.json();

    return {
        ...speciesResult,
        results: speciesResult.results.map(s => {
            const match = /species\/(?<id>\d+)/g.exec(s.url);
            
            return {
                ...s,
                id: +(match?.groups?.id ?? '')
            };
        })
    };
}

/**
 * Loads a list of Characters that matches the given search expression.
 * 
 * @param searchExpr search expression for filtering the available Characters
 * @returns Promise that resolves to a filtered list of Characters based on the search criteria
 */
export async function fetchCharacters(searchExpr: string): Promise<Character[]> {
    const charactersResult: Response = await fetch(`https://swapi.dev/api/people/?search=${searchExpr}`);
    if (!charactersResult.ok) {
        throw new Error("Characters not found!");
    }
    const data: CharactersSearchResult = await charactersResult.json();
    const characters: Character[] = data.results.map(c => {
        const match = /people\/(?<id>\d+)/g.exec(c.url);
        
        return {
            ...c,
            id: +(match?.groups?.id ?? '')
        };
    })
    return characters;
}