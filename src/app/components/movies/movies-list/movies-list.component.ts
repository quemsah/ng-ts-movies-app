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
  items = [];
  pageOfItems: Array<Movie>;
  constructor(
    private movieService: MovieService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getMovies();
    //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
  handleListClick() {
    document
      .querySelectorAll(".movie-item")
      .forEach(x => x.classList.add("list-item"));
    //$(".movie-item").addClass("list-item");
  }
  handleGridClick() {
    document
      .querySelectorAll(".movie-item")
      .forEach(x => x.classList.remove("list-item"));
    //$(".movie-item").removeClass("list-item");
  }
  getMovies(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
  onChangePage(pageOfItems: Array<Movie>) {
    this.pageOfItems = pageOfItems;
}
}
