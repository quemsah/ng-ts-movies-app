import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin } from "rxjs";
import { MovieCredits } from "../../../shared/models/api-movie-credits";
import { Star } from "../../../shared/models/api-star";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnInit {
  public starData: Star;
  public starMovies: MovieCredits;
  constructor(
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    const sid = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.getStarInfoAndMovies(sid);
  }

  public getStarInfoAndMovies(id: number): void {
    // tslint:disable-next-line: deprecation
    forkJoin(this.tmdbService.fetchStar(id), this.tmdbService.fetchStarMovies(id)).subscribe(
      ([starData, starMoviesData]) => {
        this.starData = starData;
        console.log("Star info:");
        console.log(this.starData);
        this.starMovies = starMoviesData;
        console.log("Known in movies:");
        console.log(this.starMovies);
        this.spinner.hide();
      }
    );
  }
}
