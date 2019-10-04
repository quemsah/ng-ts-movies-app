import { Cast } from "./api-cast";
import { Crew } from "./api-crew";

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
