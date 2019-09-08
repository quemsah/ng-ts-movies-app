import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TMDBService {
  // private URL_DISCOVER = "https://api.themoviedb.org/3/discover/movie";
  // private URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
  // private URL_MOVIE = "https://api.themoviedb.org/3/movie";
  // private URL_PERSON = "https://api.themoviedb.org/3/person";
  // private URL_GENRE = "https://api.themoviedb.org/3/genre";

  // private lang = this.storageService.read('language');
  private API_KEY = "546bffd504ec7e8b262023ec0ec6f0e3";
  private URL_FIND = "https://api.themoviedb.org/3/find";
  private URL_MOVIE = "https://api.themoviedb.org/3/movie";

  constructor(private http: HttpClient) {}

  // getDetailsMovie(
  //   movieID: number,
  //   lang: string
  // ): Observable<any> {
  //   return this.http.get<any>(
  //     `${this.URL_MOVIE}/${movieID}?api_key=${this.API_KEY}&language=${lang}`
  //   );
  // }
  getMovieByIMDBID(ImdbId: string): Observable<any> {
    return this.http.get<any>(
      `${this.URL_FIND}/${ImdbId}?api_key=${this.API_KEY}&language=en-US&external_source=imdb_id`
    );
  }

  getMovieDetailsbyTMDBID(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${movieId}?api_key=${this.API_KEY}&language=en-US}`
    );
  }
}
