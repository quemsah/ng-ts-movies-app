import { Component, OnInit, AfterViewInit, TemplateRef } from "@angular/core";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { StarRatingComponent } from "ng-starrating";
import { NgxSpinnerService } from "ngx-spinner";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
// Интерфейсы
import { Cast } from "../../../shared/models/api-cast";
import { Comment } from "./../../../shared/models/comment";
import { Movie } from "../../../shared/models/movie";
import { Trailers } from "../../../shared/models/api-trailers";
import { MovieListItem } from "../../../shared/models/movie-list-item";
import { TmdbMovie } from "../../../shared/models/api-movie";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;
  movieComments: Comment[];
  movieCast: Cast[];
  movieTrailers: Trailers[];
  movieSimilars: TmdbMovie[];
  currentMovieRating: number;
  currentMovieWatchLater: boolean;
  currentMovieFavourites: boolean;
  currentCommentText: string;
  modalRef: BsModalRef;

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

  ngOnInit() {
    this.spinner.show();
    this.getMovie();
    this.getComments();
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
  // прыгнуть к изменению своего комментария
  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
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

  getComments(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchComments(id).subscribe(data => {
      this.movieComments = data;
      this.spinner.hide();
      // console.log("Comments");
      // console.log(this.movieComments);
    });
  }

  getUsersMovieInfo(): void {
    const mid = this.route.snapshot.paramMap.get("id");
    const uid = this.authService.userData.uid;
    this.movieService
      .fetchRating(uid, mid)
      .subscribe(data => (this.currentMovieRating = data ? data.rated : null));
    this.movieService
      .fetchFavourites(uid, mid)
      .subscribe(data => (this.currentMovieFavourites = data ? true : false));
    this.movieService
      .fetchWatchLater(uid, mid)
      .subscribe(data => (this.currentMovieWatchLater = data ? true : false));
  }

  getMovieCast(id: number): void {
    this.tmdbService.fetchMovieCreditsbyTMDBID(id).subscribe(data => {
      this.movieCast = this.movieService.sliceData(data.cast, 12);
      // спиннер убираем тут, так как на данном этапе информация о фильме загружена
      // и ниже находятся актеры, а трейлеры – в другой вкладке, комментарии еще ниже
      this.spinner.hide();
      console.log("Cast");
      console.log(this.movieCast);
    });
  }

  getMovieTrailers(id: number): void {
    this.tmdbService.fetchMovieTrailersByTMDBID(id).subscribe(data => {
      this.movieTrailers = this.movieService.sliceData(data.results, 6);
      this.movieTrailers.forEach((value, i) => {
        value[i].key = "https://www.youtube.com/embed/" + value[i].key + "?rel=0";
      });
      // console.log("Trailers");
      // console.log(this.movieTrailers);
    });
  }

  getSimilarMovies(id: number): void {
    this.tmdbService.fetchSimilarMoviesByTMDBID(id).subscribe(data => {
      this.movieSimilars = this.movieService.sliceData(data.results, 8);
      // console.log("Similar movies");
      // console.log(this.movieSimilars);
    });
  }

  handleMovieEdit(): void {
    // роутит на соответствующую страничку
    console.log(this.movieData.mid);
  }

  handleMovieDelete(): void {
     this.movieService.deleteMovie(this.movieData.mid);
  }

  handleToWatchLater(): void {
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

  handleToFavourites(): void {
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

  handleRate($event: {
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

  handleAddComment(form: NgForm): void {
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

  handleCommentEdit(event): void {
    const cid = this.movieService.getElementId(event);
    const text = document.getElementById("t" + cid).innerText;
    this.currentCommentText = text;
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  handleCommentDelete(event): void {
    const cid = this.movieService.getElementId(event);
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  openModalShare(shareTemplate: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(shareTemplate);
  }

  openModalDelete(deleteMovieTemplate: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(deleteMovieTemplate);
  }
}
