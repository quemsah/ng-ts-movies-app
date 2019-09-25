import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { AlertService } from "../alert/alert.service";

@Injectable()
export class TMDBService {
  private API_KEY = "546bffd504ec7e8b262023ec0ec6f0e3";
  private URL_FIND = "https://api.themoviedb.org/3/find";
  private URL_MOVIE = "https://api.themoviedb.org/3/movie";
  private URL_STAR = "https://api.themoviedb.org/3/person";

  constructor(private http: HttpClient, private alertService: AlertService) {}

  fetchMovieByIMDBID(ImdbId: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.URL_FIND}/${ImdbId}?api_key=${this.API_KEY}&language=en-US&external_source=imdb_id`
      )
      .pipe(
        map(answer =>
          answer.movie_results.length > 0
            ? answer
            : this.alertService.openWarningAlert("Wrong ID!", 2)
        )
      )
      .pipe(
        mergeMap(data =>
          data.movie_results.length > 0
            ? // tslint:disable-next-line: deprecation
              forkJoin(
                this.fetchMovieDetailsByTMDBID(data.movie_results[0].id),
                this.fetchMovieCrewbyTMDBID(data.movie_results[0].id)
              )
            : of(null)
        )
      );
  }

  fetchMovieDetailsByTMDBID(mid: number): Observable<any> {
    return this.http.get<any>(`${this.URL_MOVIE}/${mid}?api_key=${this.API_KEY}&language=en-US}`);
  }

  fetchMovieCrewbyTMDBID(mid: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${mid}/credits?api_key=${this.API_KEY}&language=en-US}`
    );
  }

  fetchMovieTrailersByTMDBID(mid: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${mid}/videos?api_key=${this.API_KEY}&language=en-US}`
    );
  }

  fetchSimilarMoviesByTMDBID(mid: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${mid}/similar?api_key=${this.API_KEY}&language=en-US&page=1}`
    );
  }

  fetchStar(sid: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_STAR}/${sid}?api_key=${this.API_KEY}&language=&language=en-US`
    );
  }
  fetchStarMovies(sid: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_STAR}/${sid}/movie_credits?api_key=${this.API_KEY}&language=en-US&page=1`
    );
  }
}
