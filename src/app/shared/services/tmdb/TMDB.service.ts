import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { MovieCategory } from "../../models/api-movie-category";
import { MovieCredits } from "../../models/api-movie-credits";
import { MovieDetails } from "../../models/api-movie-details";
import { Star } from "../../models/api-star";
import { Trailers } from "../../models/api-trailers";
import { AlertService } from "../alert/alert.service";

@Injectable()
export class TMDBService {
  public URL_BACKDROP = "https://image.tmdb.org/t/p/w1400_and_h450_face";
  public URL_IMG_H450 = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  public URL_IMG_H175 = "https://image.tmdb.org/t/p/w138_and_h175_face";
  private API_KEY = "546bffd504ec7e8b262023ec0ec6f0e3";
  private URL_FIND = "https://api.themoviedb.org/3/find";
  private URL_MOVIE = "https://api.themoviedb.org/3/movie";
  private URL_DISCOVER = "https://api.themoviedb.org/3/discover/movie";
  private URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
  private URL_STAR = "https://api.themoviedb.org/3/person";

  constructor(private http: HttpClient, private alertService: AlertService) {}
  // ищет id фильма по imdb_id и затем выполняет два параллельных запроса по найденному id
  public fetchMovieByIMDBID(ImdbId: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.URL_FIND}/${ImdbId}?api_key=${this.API_KEY}&language=en-US&external_source=imdb_id`
      )
      .pipe(
        map((answer) =>
          answer.movie_results.length > 0
            ? answer
            : this.alertService.openWarningAlert("Wrong ID!", 3)
        )
      )
      .pipe(
        mergeMap((data) =>
          data.movie_results.length > 0
            ? // tslint:disable-next-line: deprecation
              forkJoin(
                this.fetchMovieDetailsByTMDBID(data.movie_results[0].id),
                this.fetchMovieCreditsbyTMDBID(data.movie_results[0].id)
              )
            : of(null)
        )
      );
  }
  // Полная информация о фильме
  public fetchMovieDetailsByTMDBID(mid: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.URL_MOVIE}/${mid}?api_key=${this.API_KEY}&language=en-US}`
    );
  }
  // Кто делал фильм и кто там играл
  public fetchMovieCreditsbyTMDBID(mid: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(
      `${this.URL_MOVIE}/${mid}/credits?api_key=${this.API_KEY}&language=en-US}`
    );
  }
  // Трейлеры к фильму
  public fetchMovieTrailersByTMDBID(mid: number): Observable<Trailers> {
    return this.http.get<Trailers>(
      `${this.URL_MOVIE}/${mid}/videos?api_key=${this.API_KEY}&language=en-US}`
    );
  }
  // Похожие фильмы
  public fetchSimilarMoviesByTMDBID(mid: number): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_MOVIE}/${mid}/similar?api_key=${this.API_KEY}&language=en-US&page=1}`
    );
  }
  // Данные о персоне
  public fetchStar(sid: number): Observable<Star> {
    return this.http.get<Star>(
      `${this.URL_STAR}/${sid}?api_key=${this.API_KEY}&language=&language=en-US`
    );
  }
  // Фильмы, в которых участвовал указанный человек
  public fetchStarMovies(sid: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(
      `${this.URL_STAR}/${sid}/movie_credits?api_key=${this.API_KEY}&language=en-US&page=1`
    );
  }
  // Фильмы из поиска
  public fetchFoundMovies(page: number, query: string): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_SEARCH}?api_key=${this.API_KEY}&language=en-US&query=${query}&page=${page}`
    );
  }
  // Самые популярные фильмы сейчас
  public fetchPopularMovies(page: number): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_DISCOVER}?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
    );
  }
  // Сейчас в кинотеатрах
  public fetchNowPlaying(page: number): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_MOVIE}/now_playing?api_key=${this.API_KEY}&language=en-US&page=${page}`
    );
  }
  // С наивысшим рейтингом
  public fetchHighestRated(page: number): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_MOVIE}/top_rated?api_key=${this.API_KEY}&language=en-US&page=${page}`
    );
  }
  // С выбранным жанром
  public fetchByGenre(page: number, genre: string): Observable<MovieCategory> {
    return this.http.get<MovieCategory>(
      `${this.URL_DISCOVER}?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genre}&page=${page}`
    );
  }
}
