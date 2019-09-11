import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { AlertService } from '../alert/alert.service';

@Injectable()
export class TMDBService {
  private API_KEY = "546bffd504ec7e8b262023ec0ec6f0e3";
  private URL_FIND = "https://api.themoviedb.org/3/find";
  private URL_MOVIE = "https://api.themoviedb.org/3/movie";

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getMovieByIMDBID(ImdbId: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.URL_FIND}/${ImdbId}?api_key=${this.API_KEY}&language=en-US&external_source=imdb_id`
      )
      .pipe(
        map(answer =>
          answer.movie_results.length > 0
            ? answer
            : this.alertService.openWarningAlert("Wrong ID!", 1)
        )
      )
      .pipe(
        mergeMap(data =>
          data.movie_results.length > 0
            ? forkJoin(
                this.getMovieDetailsbyTMDBID(data.movie_results[0].id),
                this.getMovieCrewbyTMDBID(data.movie_results[0].id)
              )
            : of(null)
        )
      );
  }

  getMovieDetailsbyTMDBID(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${movieId}?api_key=${this.API_KEY}&language=en-US}`
    );
  }

  getMovieCrewbyTMDBID(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.URL_MOVIE}/${movieId}/credits?api_key=${this.API_KEY}&language=en-US}`
    );
  }
}
