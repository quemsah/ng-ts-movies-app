import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieCredits } from "../../../shared/models/api-movie-credits";
import { Star } from "../../../shared/models/api-star";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnInit {
  starData: Star;
  starMovies: MovieCredits;
  constructor(
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    const sid = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.getStarInfo(sid);
    this.getStarMovies(sid);
  }

  getStarInfo(id: number): void {
    this.tmdbService.fetchStar(id).subscribe(data => {
      this.starData = data;
      // todo: почему тут лоадер не работает
      this.spinner.hide();
      // console.log("Star info:");
      console.log(this.starData);
    });
  }

  getStarMovies(id: number): void {
    this.tmdbService.fetchStarMovies(id).subscribe(data => {
      this.starMovies = data;
      // console.log("Known in movies");
      console.log(this.starMovies);
    });
  }
}
