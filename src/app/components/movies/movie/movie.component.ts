import { AfterViewInit, Component, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DomSanitizer, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { StarRatingComponent } from "ng-starrating";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
// Интерфейсы
import { Cast } from "../../../shared/models/api-cast";
import { TmdbMovie } from "../../../shared/models/api-movie";
import { Trailers } from "../../../shared/models/api-trailers";
import { Movie } from "../../../shared/models/movie";
import { MovieListItem } from "../../../shared/models/movie-list-item";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { Comment } from "./../../../shared/models/comment";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  public movieData: Movie;
  public movieComments: Comment[];
  public movieCast: Cast[];
  public movieTrailers: Trailers[];
  public movieSimilars: TmdbMovie[];
  public currentMovieRating: number;
  public currentMovieWatchLater: boolean;
  public currentMovieFavourites: boolean;
  public currentCommentText: string;
  public currentCommentID: string;
  public modalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    public sanitizer: DomSanitizer,
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    public movieService: MovieService,
    private route: ActivatedRoute,
    private titleService: Title,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    this.getMovie();
    this.getComments();
  }

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
  // прыгнуть к изменению своего комментария
  public scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  public getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe((movie) => {
      this.movieData = movie;
      console.log("Movie data: ", this.movieData);
      this.titleService.setTitle(this.movieData.title);
      const tmdb_id = this.movieData.tmdb_id;
      this.getUsersMovieInfo();
      // tslint:disable-next-line: no-unused-expression
      tmdb_id ? this.getMovieCast(parseInt(tmdb_id, 10)) : null;
      // tslint:disable-next-line: no-unused-expression
      tmdb_id ? this.getMovieTrailers(parseInt(tmdb_id, 10)) : null;
      // tslint:disable-next-line: no-unused-expression
      tmdb_id ? this.getSimilarMovies(parseInt(tmdb_id, 10)) : null;
    });
  }

  public getComments(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchComments(id).subscribe((data) => {
      this.movieComments = data;
      this.spinner.hide();
      console.log("Comments: ", this.movieComments);
    });
  }

  public getUsersMovieInfo(): void {
    const mid = this.route.snapshot.paramMap.get("id");
    const uid = this.authService.userData.uid;
    this.movieService
      .fetchRating(uid, mid)
      .subscribe((data) => (this.currentMovieRating = data ? data.rated : null));
    this.movieService
      .fetchFavourites(uid, mid)
      .subscribe((data) => (this.currentMovieFavourites = data ? true : false));
    this.movieService
      .fetchWatchLater(uid, mid)
      .subscribe((data) => (this.currentMovieWatchLater = data ? true : false));
  }

  public getMovieCast(id: number): void {
    this.tmdbService.fetchMovieCreditsbyTMDBID(id).subscribe((data) => {
      this.movieCast = this.movieService.sliceData(data.cast, 12);
      // спиннер убираем тут, так как на данном этапе информация о фильме загружена
      // и ниже находятся актеры, а трейлеры – в другой вкладке, комментарии еще ниже
      this.spinner.hide();
      console.log("Cast: ", this.movieCast);
    });
  }

  public getMovieTrailers(id: number): void {
    this.tmdbService.fetchMovieTrailersByTMDBID(id).subscribe((data) => {
      this.movieTrailers = this.movieService.sliceData(data.results, 6);
      this.movieTrailers.forEach((value, i) => {
        value[i].key = "https://www.youtube.com/embed/" + value[i].key + "?rel=0";
      });
      console.log("Trailers: ", this.movieTrailers);
    });
  }

  public getSimilarMovies(id: number): void {
    this.tmdbService.fetchSimilarMoviesByTMDBID(id).subscribe((data) => {
      this.movieSimilars = this.movieService.sliceData(data.results, 8);
      console.log("Similar movies: ", this.movieSimilars);
    });
  }

  public handleMovieEdit(): void {
    // роутит на соответствующую страничку
    console.log("Edit movie => mid = " + this.movieData.mid);
  }

  public handleMovieDelete(): void {
    this.movieService.deleteMovie(this.movieData.mid);
  }

  public handleToWatchLater(): void {
    const watchLaterMovieData: MovieListItem = {
      mid: this.movieData.mid,
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "watchlater",
      watchLaterMovieData,
      this.authService.userData.uid
    );
  }

  public handleToFavourites(): void {
    const favouritesMovieData: MovieListItem = {
      mid: this.movieData.mid,
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "favourites",
      favouritesMovieData,
      this.authService.userData.uid
    );
  }

  public handleRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }): void {
    const ratedMovieData: MovieListItem = {
      mid: this.movieData.mid,
      date: new Date().toLocaleString(),
      rated: $event.newValue
    };
    this.movieService.toggleMovieToList("rated", ratedMovieData, this.authService.userData.uid);
  }

  public handleAddComment(form: NgForm): void {
    const now = new Date().toLocaleString();
    if (form.value.CommentText.trim() !== "") {
      const commentData: Comment = {
        cid: this.movieService.generateCommentID(now),
        date: now,
        user_id: this.authService.userData.uid,
        user_name: this.authService.userData.displayName,
        text: form.value.CommentText.trim().substring(0, 300)
      };
      this.movieService.addComment(commentData, this.movieData.mid);
      form.reset();
    }
  }

  public handleCommentEdit(event): void {
    const cid = this.movieService.getElementId(event);
    const text = document.getElementById("t" + cid).innerText;
    this.currentCommentText = text;
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  public handleCommentDelete(cid: string): void {
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  public openModalShare(shareTemplate: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(shareTemplate);
  }

  public openModalDelete(deleteMovieTemplate: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(deleteMovieTemplate);
  }

  public openDeleteComment(deleteCommentTemplate: TemplateRef<any>, event): void {
    this.currentCommentID = this.movieService.getElementId(event);
    console.log("currentCommentID: ", this.currentCommentID);
    this.modalRef = this.modalService.show(deleteCommentTemplate);
  }
}
