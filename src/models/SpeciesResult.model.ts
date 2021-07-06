import { Species } from "./Species.model";

export interface SpeciesResult {
    count: number;
    next: string;
    previous: string;
    results: Species[];
}