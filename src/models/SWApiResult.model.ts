import { URLString } from "./types";

export interface SWApiResult {
  count: number;
  next: URLString;
  previous: URLString;
}
