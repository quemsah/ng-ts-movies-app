import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"]
})
export class DiscoverComponent implements OnInit {
  movies: any[];
  genres = this.movieService.genres;
  category: string;
  title: string;
  searchValue: "";
  // default genreValue = "Adventrure"
  genreValue = 12;
  pageOfItems: Array<any>;
  constructor(
    public tmdbService: TMDBService,
    public movieService: MovieService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.category = this.route.snapshot.routeConfig.path;
    switch (this.category) {
      case "popular":
        this.title = "Most popular movies";
        return this.getDiscoveredMovies(this.tmdbService.fetchPopularMovies.bind(this.tmdbService));
      case "now-playing":
        this.title = "Movies now playing in theaters";
        return this.getDiscoveredMovies(this.tmdbService.fetchNowPlaying.bind(this.tmdbService));
      case "highest-rated":
        this.title = "Highest rated movies";
        return this.getDiscoveredMovies(this.tmdbService.fetchHighestRated.bind(this.tmdbService));
      case "genres":
        this.title = "Discover by genres";
        return this.getDiscoveredMovies(this.tmdbService.fetchByGenre.bind(this.tmdbService), "12");
      // case "search:/query"
      default:
        this.category = "search";
        this.searchValue = this.route.snapshot.params.query;
        console.log(this.category + ": query = " + this.searchValue);
        this.title = "Search movies";
        return this.getDiscoveredMovies(this.tmdbService.fetchPopularMovies.bind(this.tmdbService));
    }
  }

  mergeItems = arr => {
    return [
      ...Object.values(arr[0].results),
      ...Object.values(arr[1].results),
      ...Object.values(arr[2].results)
    ];
  };

  getDiscoveredMovies(fetcher, genre?: string) {
    // tslint:disable-next-line: deprecation
    forkJoin(fetcher(1, genre), fetcher(2, genre), fetcher(3, genre)).subscribe(data => {
      this.movies = this.mergeItems(data);
      // console.log(this.movies);
      this.spinner.hide();
    });
  }

  onGenreValueChange(genre: any): void {
    this.spinner.show();
    this.genreValue = genre;
    // console.log('Genre id = ' + this.genreValue);
    this.getDiscoveredMovies(
      this.tmdbService.fetchByGenre.bind(this.tmdbService),
      this.genreValue.toString()
    );
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
