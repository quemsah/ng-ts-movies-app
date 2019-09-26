import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"]
})
export class DiscoverComponent implements OnInit {
  movies: any[];
  category: string;
  pageOfItems: Array<any>;
  constructor(private route: ActivatedRoute, public tmdbService: TMDBService) {}

  ngOnInit() {
    this.category = this.route.snapshot.routeConfig.path;
    switch (this.category) {
      case "popular":
        return this.getDiscoveredMovies(this.tmdbService.fetchPopularMovies.bind(this.tmdbService));
      case "now-playing":
        return this.getDiscoveredMovies(this.tmdbService.fetchNowPlaying.bind(this.tmdbService));
      case "highest-rated":
        return this.getDiscoveredMovies(this.tmdbService.fetchHighestRated.bind(this.tmdbService));
    }
  }

  mergeItems = arr => {
    return [
      ...Object.values(arr[0].results),
      ...Object.values(arr[1].results),
      ...Object.values(arr[2].results)
    ];
    // tslint:disable-next-line: semicolon
  };

  getDiscoveredMovies(fetcher) {
    // tslint:disable-next-line: deprecation
    forkJoin(fetcher(1), fetcher(2), fetcher(3)).subscribe(
      data => (this.movies = this.mergeItems(data))
    );
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
