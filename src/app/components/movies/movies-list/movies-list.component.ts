import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  movies: Movie[];
  constructor(
    private movieService: MovieService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getMovies();
  }
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }

  // getMovie(): void {
  //   const id = this.route.snapshot.paramMap.get("id");
  //   this.movieService.getMovie(id).subscribe(movie => {
  //     this.movieData = movie;
  //     this.titleService.setTitle(this.movieData.title);
  //   });
  // }

  getMovies(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
