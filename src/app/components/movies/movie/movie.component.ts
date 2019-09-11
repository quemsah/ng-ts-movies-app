import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;
  movieCrew: any;
  movieTrailers: any;
  movieSimilars: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private titleService: Title,
    private themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
      this.titleService.setTitle(this.movieData.title);
      this.movieData.tmdb_id
        ? this.getMovieCrew(parseInt(this.movieData.tmdb_id))
        : null;
      this.movieData.tmdb_id
        ? this.getMovieTrailers(parseInt(this.movieData.tmdb_id))
        : null;
    });
  }

  getMovieCrew(id: number): void {
    this.tmdbService.getMovieCrewbyTMDBID(id).subscribe(movieCrewData => {
      this.movieCrew = this.movieService.sliceData(movieCrewData.cast, 12);
    });
  }
  getMovieTrailers(id: number): void {
    this.tmdbService
      .getMovieTrailersByTMDBID(id)
      .subscribe(movieTrailersData => {
        this.movieTrailers = this.movieService.sliceData(
          movieTrailersData.results,
          12
        );
        this.movieTrailers.forEach(function(value, i) {
          value[i].key =
            "https://www.youtube.com/embed/" + value[i].key + "?rel=0";
        });
      });
  }
}
