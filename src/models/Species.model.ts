import { Identifiable } from './Identifiable.model';
import { CommaSeparatedString, NumberString, DateString, URLString } from "./types";

export interface Species extends Identifiable {
    name: string;
    classification: string;
    designation: string;
    average_height: NumberString;
    skin_colors: CommaSeparatedString;
    hair_colors: CommaSeparatedString;
    eye_colors: CommaSeparatedString;
    average_lifespan: NumberString;
    homeworld: URLString;
    language: string;
    people: URLString[];
    films: URLString[];
    created: DateString;
    edited: DateString;
}