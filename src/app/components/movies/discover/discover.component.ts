import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { forkJoin, merge } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"]
})
export class DiscoverComponent implements OnInit {
  movies: any[];
  category: string;
  pageOfItems: Array<any>;
  constructor(private route: ActivatedRoute, private tmdbService: TMDBService) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get("category");
    switch (this.category) {
      case "popular":
        return this.getPopularMovies();
      case "now-playing":
        return this.getNowPlaying();
      case "highest-rated":
        return this.getHighestRated();
    }
  }

  mergeItems = arr => {
    return [
      ...Object.values(arr[0].results),
      ...Object.values(arr[1].results),
      ...Object.values(arr[2].results)
    ];
  };

  getPopularMovies() {
    // tslint:disable-next-line: deprecation
    forkJoin(
      this.tmdbService.fetchPopularMovies(1),
      this.tmdbService.fetchPopularMovies(2),
      this.tmdbService.fetchPopularMovies(3)
    ).subscribe(data => (this.movies = this.mergeItems(data)));
  }

  getNowPlaying() {
    // tslint:disable-next-line: deprecation
    forkJoin(
      this.tmdbService.fetchNowPlaying(1),
      this.tmdbService.fetchNowPlaying(2),
      this.tmdbService.fetchNowPlaying(3)
    ).subscribe(data => (this.movies = this.mergeItems(data)));
  }

  getHighestRated() {
    // tslint:disable-next-line: deprecation
    forkJoin(
      this.tmdbService.fetchHighestRated(1),
      this.tmdbService.fetchHighestRated(2),
      this.tmdbService.fetchHighestRated(3)
    ).subscribe(data => (this.movies = this.mergeItems(data)));
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
