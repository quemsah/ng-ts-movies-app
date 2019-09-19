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
  pageOfItems: Array<Movie>;
  sortingValue: string = "dateAdded";
  sortingType: string = "desc";
  searchValue: string = "";
  sortingValues = [
    { id: 0, value: "dateAdded", name: "Date Added" },
    { id: 1, value: "title", name: "Title" },
    { id: 2, value: "releaseDate", name: "Release Date" },
    { id: 3, value: "country", name: "Country" },
    { id: 4, value: "IMDBRating", name: "IMDB Rating" },
    { id: 5, value: "genres", name: "Genre" },
    { id: 6, value: "director", name: "Director" },
    { id: 7, value: "budget", name: "Budget" },
    { id: 8, value: "revenue", name: "Revenue" }
  ];
  constructor(
    private movieService: MovieService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  handleListClick() {
    document
      .querySelectorAll(".movie-item")
      .forEach(x => x.classList.add("list-item"));
  }

  handleGridClick() {
    document
      .querySelectorAll(".movie-item")
      .forEach(x => x.classList.remove("list-item"));
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
  filterByAll = (movies, key) =>
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
    this.movieService
      .fetchMovies(this.sortingValue, this.sortingType)
      .subscribe(movies => {
        this.movies = this.filterByAll(movies, this.searchValue.toLowerCase());
      });
  }

  onChangePage(pageOfItems: Array<Movie>) {
    this.pageOfItems = pageOfItems;
  }
}
