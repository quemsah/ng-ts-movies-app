import { Movie } from "./../../shared/services/movie";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../shared/services/movie.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  movieData: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getMovie();
    console.log(this.movieData.title)
    this.titleService.setTitle(this.movieData.title);
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.movieData = movie;
      this.titleService.setTitle(this.movieData.title);
    });
  }
}
