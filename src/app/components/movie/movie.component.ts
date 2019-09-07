import { Movie } from "./../../shared/services/movie";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../shared/services/movie.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.getMovie(id).subscribe(movie => (this.movie = movie));
  }
}
