import { TmdbMovie } from "./api-movie";

export interface MovieCategory {
  page: number;
  results: TmdbMovie[];
  dates?: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}
