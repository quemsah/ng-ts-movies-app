import { Movie } from "./../../shared/services/movie";
import { Component, OnInit } from "@angular/core";
import { MovieService } from "src/app/shared/services/movie.service";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  // getMovie(): void {
  //   const id = this.route.snapshot.paramMap.get("id");
  //   this.movieService.getMovie(id).subscribe(movie => {
  //     this.movieData = movie;
  //     this.titleService.setTitle(this.movieData.title);
  //   });
  // }

  getMovies(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
