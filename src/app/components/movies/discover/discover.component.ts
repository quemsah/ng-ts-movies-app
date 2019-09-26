import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";

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
    this.tmdbService.fetchPopularMovies(1).subscribe(x => {
      this.movies = x.results;
      console.log(x);
    });
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
