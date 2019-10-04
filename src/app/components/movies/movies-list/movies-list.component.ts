import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Movie } from "../../../shared/models/movie";
import { MovieListItem } from "../../../shared/models/movie-list-item";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  public movies: Movie[];
  public pageOfItems: Movie[];
  public sortingValue = "dateAdded";
  public sortingType = "desc";
  public searchValue = "";
  public sortingValues = this.movieService.sortingFields;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    this.getMovies();
  }

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  public handleListClick(): void {
    document.querySelectorAll(".movie-item").forEach((x) => x.classList.add("list-item"));
  }

  public handleGridClick(): void {
    document.querySelectorAll(".movie-item").forEach((x) => x.classList.remove("list-item"));
  }

  public onSortingValueChange(sValue: string): void {
    this.sortingValue = sValue.substr(3);
    this.getMovies();
  }

  public onSortingTypeChange(sType: string): void {
    this.sortingType = sType;
    this.getMovies();
  }

  public onSearchChange(): void {
    this.getMovies();
  }
  // Фильтрация по всем полям
  public filterByAll = (movies, key): Movie[] =>
    movies.filter((obj) =>
      Object.keys(movies[0]).some(
        (k) =>
          obj[k]
            .toString()
            .toLowerCase()
            .indexOf(key) !== -1
      )
    )

  public getMovies(): void {
    this.movieService.fetchMovies(this.sortingValue, this.sortingType).subscribe((movies) => {
      this.movies = this.filterByAll(movies, this.searchValue.trim().toLowerCase());
      this.spinner.hide();
    });
  }

  public handleToWatchLater(event): void {
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

  public handleToFavourites(event): void {
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

  public onChangePage(pageOfItems: Movie[]): void {
    this.pageOfItems = pageOfItems;
  }
}
