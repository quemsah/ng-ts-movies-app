import { Movie } from "../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit, AfterViewInit {
  movieData: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private titleService: Title,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
      this.titleService.setTitle(this.movieData.title);
    });
  }
}
