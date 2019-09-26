import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-discovered-movie",
  templateUrl: "./discovered-movie.component.html",
  styleUrls: ["./discovered-movie.component.css"]
})
export class DiscoveredMovieComponent implements OnInit {
  discoveredMovieData: any;

  constructor(
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDiscoveredMovie();
  }

  getDiscoveredMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.tmdbService.fetchMovieDetailsByTMDBID(id).subscribe(movie => {
      this.discoveredMovieData = movie;
      console.log(this.discoveredMovieData);
    });
  }
}
