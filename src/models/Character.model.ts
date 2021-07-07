import { Identifiable } from "./Identifiable.model";
import { NumberString, DateString, URLString } from "./types";

export interface Character extends Identifiable {
    name: string;
    height: NumberString;
    mass: NumberString;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: URLString;
    films: URLString[];
    species: URLString[];
    vehicles: URLString[];
    starships: URLString[];
    created: DateString;
    edited: DateString;
}