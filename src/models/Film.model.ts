import { Identifiable } from "./Identifiable.model";
import { DateString, URLString } from "./types";

export interface Film extends Identifiable {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: URLString[];
  planets: URLString[];
  starships: URLString[];
  vehicles: URLString[];
  species: URLString[];
  created: DateString;
  edited: DateString;
  url: URLString;
}
