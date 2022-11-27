/* eslint-disable prettier/prettier */
export interface ResponsePokedex {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}
export interface Result {
  name: string;
  no?: number;
  url: string;
}
