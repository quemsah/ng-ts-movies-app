import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnInit {
  starData: any;
  starMovies: any;
  constructor(
    public themeService: ThemeService,
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    const sid = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getStarInfo(sid);
    this.getStarMovies(sid);
  }

  getStarInfo(id: number): void {
    this.tmdbService.fetchStar(id).subscribe(data => {
      this.starData = data;
      // todo: почему тут лоадер не работает
      this.spinner.hide();
      // console.log("Star info:");
      // console.log(this.starData);
    });
  }

  getStarMovies(id: number): void {
    this.tmdbService.fetchStarMovies(id).subscribe(data => {
      this.starMovies = data;
      // console.log("Known in movies");
      // console.log(this.starMovies);
    });
  }
}
