import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { Movie } from "../../../shared/models/movie";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrls: ["./edit-movie.component.css"]
})
export class EditMovieComponent implements OnInit {
  currentMovieData: any;
  title: string;
  releaseDate: string;
  // {make: null};
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.fetchMovie(id).subscribe(movie => {
      this.currentMovieData = movie;
      this.title = movie.title;
      this.releaseDate = movie.releaseDate;
    });
  }
  onEditMovieSubmit(form: NgForm) {
    // приводим к нужному виду
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(
        form.value.Date,
        form.value.MovieName
      ),
      imdb_id: this.currentMovieData.imdb_id,
      tmdb_id: this.currentMovieData.tmdb_id,
      dateAdded: Math.round(+new Date() / 1000),
      title: form.value.MovieName,
      releaseDate: form.value.Date,
      country: form.value.Country,
      IMDBRating: form.value.IMDBRating,
      genres: this.currentMovieData.genres,
      director: form.value.Director,
      posterLink: form.value.Poster,
      backdropLink: form.value.Backdrop,
      runtime: form.value.Runtime,
      budget: form.value.Budget,
      revenue: form.value.Revenue,
      overview: form.value.Overview
    };
    // если название и дата не менялись, то записывам изменения
    // { merge: true }, а если менялись, то будет новый документ
    // с новым айдишником и новыми комментариями, так как это
    // уже будет другой фильм, требующий другого URL
    this.title == form.value.MovieName && this.releaseDate == form.value.Date
      ? null
      : this.movieService.deleteMovie(this.currentMovieData.mid);
    this.movieService.setMovieData(movieData);
  }
}
