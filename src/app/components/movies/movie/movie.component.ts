import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title } from "@angular/platform-browser";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;
  movieCrew: any;
  movieSimilars: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TMDBService,
    private titleService: Title,
    private themeService: ThemeService
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
      if (this.movieData.tmdb_id) {
        this.getMovieCrew(parseInt(this.movieData.tmdb_id));
      }
    });
  }

  getMovieCrew(id: number): void {
    this.tmdbService.getMovieCrewbyTMDBID(id).subscribe(movieCrewData => {
      this.movieCrew = this.movieService.sliceMovieCrew(movieCrewData.cast);
      console.log(this.movieCrew);
    });
  }
}
