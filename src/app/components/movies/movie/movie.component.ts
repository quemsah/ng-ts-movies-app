import { Component, OnInit, AfterViewInit, TemplateRef } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
// Интерфейсы
import { SimilarMovie } from "../../../shared/models/similar-movie";
import { Crew } from "./../../../shared/models/crew";
import { Comment } from "./../../../shared/models/comment";
import { Movie } from "../../../shared/models/movie";
import { Trailer } from "../../../shared/models/trailer";
import { MovieListItem } from "../../../shared/models/movie-list-comment";

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

  ngOnInit(): void {
    this.getMovie();
    this.getComments();
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
  // прыгнуть к изменению своего комментария
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
      this.titleService.setTitle(this.movieData.title);
      const tmdb_id = this.movieData.tmdb_id;
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

  getMovieCrew(id: number): void {
    this.tmdbService.getMovieCrewbyTMDBID(id).subscribe(data => {
      this.movieCrew = this.movieService.sliceData(data.cast, 12);
      // console.log("Crew");
      // console.log(this.movieCrew);
    });
  }

  getMovieTrailers(id: number): void {
    this.tmdbService.getMovieTrailersByTMDBID(id).subscribe(data => {
      this.movieTrailers = this.movieService.sliceData(data.results, 12);
      this.movieTrailers.forEach(
        (value, i) => (value[i].key = "https://www.youtube.com/embed/" + value[i].key + "?rel=0")
      );
      // console.log("Trailers");
      // console.log(this.movieTrailers);
    });
  }

  getSimilarMovies(id: number): void {
    this.tmdbService.getSimilarMoviesByTMDBID(id).subscribe(data => {
      this.movieSimilars = this.movieService.sliceData(data.results, 8);
      // console.log("Similar movies");
      // console.log(this.movieSimilars);
    });
  }

  handleMovieEdit() {
    // роутит на соответствующую страничку
    console.log(this.movieData.mid);
  }

  handleMovieDelete() {
    this.movieService.deleteMovie(this.movieData.mid);
  }

  handleToWatchLater() {
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

  handleToFavourites() {
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

  handleAddComment(form: NgForm) {
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

  handleCommentEdit(event) {
    const cid = this.movieService.getElementId(event);
    const text = document.getElementById("t" + cid).innerText;
    this.currentCommentText = text;
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  handleCommentDelete(event) {
    const cid = this.movieService.getElementId(event);
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
