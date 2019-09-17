import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { NoInfoPipe } from "../../../shared/pipes/no-info.pipe";
// Интерфейсы
import { SimilarMovie } from "../../../shared/models/similar-movie";
import { Crew } from "./../../../shared/models/crew";
import { Comment } from "./../../../shared/models/comment";
import { Movie } from "../../../shared/models/movie";
import { Trailer } from "../../../shared/models/trailer";

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

  constructor(
    public authService: AuthService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private titleService: Title,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.getComments();
  }

  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
      this.titleService.setTitle(this.movieData.title);
      let tmdb_id = this.movieData.tmdb_id;
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
        (value, i) =>
          (value[i].key =
            "https://www.youtube.com/embed/" + value[i].key + "?rel=0")
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
    console.log(this.movieData.mid);
  }

  handleMovieDelete() {
    this.movieService.deleteMovie(this.movieData.mid);
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
    const target = event.target || event.srcElement || event.currentTarget;
    const cid = target.attributes.id.nodeValue;
    const text = document.getElementById("t" + cid).innerText;
    this.currentCommentText = text;
    this.movieService.deleteComment(cid, this.movieData.mid);
  }

  handleCommentDelete(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const cid = target.attributes.id.nodeValue;
    this.movieService.deleteComment(cid, this.movieData.mid);
  }
}
