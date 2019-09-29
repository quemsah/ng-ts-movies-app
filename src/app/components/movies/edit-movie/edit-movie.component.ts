import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { Movie } from "../../../shared/models/movie";

@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrls: ["./edit-movie.component.css"]
})
export class EditMovieComponent implements OnInit, AfterViewInit {
  currentMovieData: Movie;
  title: string;
  releaseDate: string;
  // {make: null};
  constructor(
    public themeService: ThemeService,
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

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  onEditMovieSubmit(form: NgForm): void {
    console.log("this.currentMovieData: ", this.currentMovieData);
    // приводим к нужному виду
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(form.value.Date, form.value.MovieName),
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
    // tslint:disable-next-line: no-unused-expression
    !(this.title === form.value.MovieName && this.releaseDate === form.value.Date)
      ? this.movieService.deleteMovie(this.currentMovieData.mid)
      : // tslint:disable-next-line: no-unused-expression
        null;
    this.movieService.setMovieData(movieData);
  }
}
