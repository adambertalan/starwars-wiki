type URLString = string;
type TimestampString = string;
type NumberString = string;
type CommaSeparatedString = string;

export interface Species {
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
    created: TimestampString;
    edited: TimestampString;
    url: URLString;
}