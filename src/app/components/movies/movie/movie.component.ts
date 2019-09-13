import { Comment } from "./../../../shared/models/comment";
import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;
  movieComments: Comment[];
  movieCrew: any;
  movieTrailers: any;
  movieSimilars: any;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private titleService: Title,
    private themeService: ThemeService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.getComments();
  }
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
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
      console.log(this.movieComments);
    });
  }
  getMovieCrew(id: number): void {
    this.tmdbService.getMovieCrewbyTMDBID(id).subscribe(data => {
      this.movieCrew = this.movieService.sliceData(data.cast, 12);
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
    });
  }
  getSimilarMovies(id: number): void {
    this.tmdbService.getSimilarMoviesByTMDBID(id).subscribe(data => {
      this.movieSimilars = this.movieService.sliceData(data.results, 8);
    });
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
}
