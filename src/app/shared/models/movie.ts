export interface Movie {
   mid: string;
   dateAdded: number;
   title: string;
   releaseDate: string;
   country: string;
   IMDBRating?: string;
   genres?: string[];
   director: string;
   posterLink?: string;
   runtime?: string;
   budget?: string;
   revenue?: string;
   overview: string;
}
