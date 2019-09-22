import { Component, OnInit, AfterViewInit, TemplateRef } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { StarRatingComponent } from "ng-starrating";
// Интерфейсы
import { SimilarMovie } from "../../../shared/models/similar-movie";
import { Crew } from "./../../../shared/models/crew";
import { Comment } from "./../../../shared/models/comment";
import { Movie } from "../../../shared/models/movie";
import { Trailer } from "../../../shared/models/trailer";
import { MovieListItem } from "../../../shared/models/movie-list-item";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;
  movieComments: Comment[];
  movieCrew: Crew[];
  movieTrailers: Trailer[];
  movieSimilars: SimilarMovie[];
  currentMovieRating: number;
  currentCommentText: string;
  modalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private titleService: Title,
    public themeService: ThemeService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
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
      this.getRating();
      tmdb_id ? this.getMovieCrew(parseInt(tmdb_id)) : null;
      tmdb_id ? this.getMovieTrailers(parseInt(tmdb_id)) : null;
      tmdb_id ? this.getSimilarMovies(parseInt(tmdb_id)) : null;
    });
  }

  getComments(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchComments(id).subscribe(data => {
      this.movieComments = data;
      // console.log("Comments");
      // console.log(this.movieComments);
    });
  }

  getRating(): void {
    const mid = this.route.snapshot.paramMap.get("id");
    const uid = this.authService.userData.uid;
    this.movieService.fetchRating(uid, mid).subscribe(data => {
      this.currentMovieRating = data.rated;
      // console.log("Your rating");
      // console.log(this.currentMovieRating);
    });
  }

  getMovieCrew(id: number): void {
    this.tmdbService.fetchMovieCrewbyTMDBID(id).subscribe(data => {
      this.movieCrew = this.movieService.sliceData(data.cast, 12);
      // console.log("Crew");
      // console.log(this.movieCrew);
    });
  }

  getMovieTrailers(id: number): void {
    this.tmdbService.fetchMovieTrailersByTMDBID(id).subscribe(data => {
      this.movieTrailers = this.movieService.sliceData(data.results, 6);
      this.movieTrailers.forEach(
        (value, i) => (value[i].key = "https://www.youtube.com/embed/" + value[i].key + "?rel=0")
      );
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
    const commentData: Comment = {
      cid: this.movieService.generateCommentID(now),
      date: now,
      user_id: this.authService.userData.uid,
      user_name: this.authService.userData.displayName,
      text: form.value.CommentText
    };
    this.movieService.addComment(commentData, this.movieData.mid);
    form.reset();
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

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
}
