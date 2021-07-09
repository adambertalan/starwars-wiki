import { Species } from "./Species.model";
import { SWApiResult } from "./SWApiResult.model";

export interface SpeciesResult extends SWApiResult {
  results: Species[];
}
