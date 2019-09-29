import { Crew } from "./api-crew";
import { Cast } from "./api-cast";

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
