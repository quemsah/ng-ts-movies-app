export interface Movie {
   mid: string;
   title: string;
   releaseDate: string;
   country: string;
   IMDBRating?: string;
   genre?: string;
   genres?: string[];
   director: string;
   posterLink?: string;
   runtime?: string;
   budget?: string;
   revenue?: string;
   overview: string;
}
