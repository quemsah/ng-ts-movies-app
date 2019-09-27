import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieListItem } from "../../../shared/models/movie-list-item";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  movies: Movie[];
  pageOfItems: Array<Movie>;
  sortingValue = "dateAdded";
  sortingType = "desc";
  searchValue = "";
  sortingValues = this.movieService.sortingFields;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getMovies();
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  handleListClick(): void {
    document.querySelectorAll(".movie-item").forEach(x => x.classList.add("list-item"));
  }

  handleGridClick(): void {
    document.querySelectorAll(".movie-item").forEach(x => x.classList.remove("list-item"));
  }

  onSortingValueChange(sValue: string): void {
    this.sortingValue = sValue.substr(3);
    this.getMovies();
  }

  onSortingTypeChange(sType: string): void {
    this.sortingType = sType;
    this.getMovies();
  }

  onSearchChange(): void {
    this.getMovies();
  }
  // Filter array over multiple properties
  filterByAll = (movies, key): Movie[] =>
    movies.filter(obj =>
      Object.keys(movies[0]).some(
        k =>
          obj[k]
            .toString()
            .toLowerCase()
            .indexOf(key) !== -1
      )
    );

  getMovies(): void {
    this.movieService.fetchMovies(this.sortingValue, this.sortingType).subscribe(movies => {
      this.movies = this.filterByAll(movies, this.searchValue.trim().toLowerCase());
      this.spinner.hide();
    });
  }

  handleToWatchLater(event): void {
    const watchLaterMovieData: MovieListItem = {
      mid: this.movieService.getElementId(event),
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "watchlater",
      watchLaterMovieData,
      this.authService.userData.uid
    );
  }

  handleToFavourites(event): void {
    const favouriteMovieData: MovieListItem = {
      mid: this.movieService.getElementId(event),
      date: new Date().toLocaleString()
    };
    this.movieService.toggleMovieToList(
      "favourites",
      favouriteMovieData,
      this.authService.userData.uid
    );
  }

  onChangePage(pageOfItems: Array<Movie>): void {
    this.pageOfItems = pageOfItems;
  }
}
