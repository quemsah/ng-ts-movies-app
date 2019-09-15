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
  searchValue: string = "";
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

  getMovies(): void {
    // this.movieService.fetchMovies(this.searchValue).subscribe(movies => {
    //   console.log('get movies');
    //   this.movies = movies;
    // });
  }

  searchByName(): void {
    const value = this.searchValue;
    console.log(value);
    this.movieService.fetchMovies(this.searchValue).subscribe(movies => {
      console.log('getting movies');
      this.movies = movies;
    });
    // this.firebaseService.searchUsers(value)
    // .subscribe(result => {
    //   this.name_filtered_items = result;
    //   this.items = this.combineLists(result, this.age_filtered_items);
    // })
  }

  onChangePage(pageOfItems: Array<Movie>) {
    this.pageOfItems = pageOfItems;
  }
}
