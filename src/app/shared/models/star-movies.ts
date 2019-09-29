import { StarMovie } from "./star-movie";
export interface StarMovies {
  cast?: {
    [key: string]: StarMovie[];
  };
  crew?: {
    [key: string]: StarMovie[];
  };
}
// фильмы в которых человек либо снимался
// либо работал
