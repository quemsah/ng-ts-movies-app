import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { Movie } from "./../../../shared/models/movie";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit, AfterViewInit {
  foundMovieData = {
    id: "",
    tmdb_id: "",
    imdb_id: "",
    original_title: "",
    vote_average: "",
    poster_path: "",
    backdrop_path: "",
    runtime: "",
    revenue: "",
    budget: "",
    release_date: "",
    overview: "",
    production_countries: [{ name: "" }]
  };
  foundMovieCredits = {
    crew: [{ name: "" }]
  };
  foundPosterPath = "";
  foundBackdropPath = "";
  foundRuntime = "";
  foundRevenue = "";
  foundBudget = "";
  genres = this.movieService.genres;

  constructor(
    public themeService: ThemeService,
    private tmdbService: TMDBService,
    private alertService: AlertService,
    private movieService: MovieService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  // Делается запрос к TMDB методом fetchMovieByIMDBID, который по индентификатору IMDB(строка) вовзращает
  // информацию о фильме. Далее запрос fetchMovieDetailsByTMDBID по только что
  // полученному TMDB идентификатору(число) возвращает полную информацию о фильме
  onImdbIDSubmit(form: NgForm): void {
    console.log("onImdbIDSubmit.form: ", form.value);
    // Переписан без подписки внутри подписки
    // Часть до подписки перенесена в TMDB.service
    // и добавлено изменение полей к удобночитаемому виду (min,$)
    // Это вынужденная мера, так как в случае ручного добавления
    // администратор может это делать в любом виде
    // (иначе он будет переводить часы в минуты, $ в рубли и т.д.)
    this.tmdbService
      .fetchMovieByIMDBID(form.value.ImdbId)
      .subscribe(([detailData, creditsData]) => {
        if (detailData) {
          this.foundMovieData = detailData;
          this.foundPosterPath = this.tmdbService.URL_IMG_H450 + this.foundMovieData.poster_path;
          this.foundBackdropPath =
            this.tmdbService.URL_BACKDROP + this.foundMovieData.backdrop_path;
          this.foundRuntime = this.foundMovieData.runtime + " min";
          this.foundRevenue = "$ " + this.foundMovieData.revenue;
          this.foundBudget = "$ " + this.foundMovieData.budget;
          console.log(detailData);
          this.movieService.compareGenres(this.genres, detailData.genres);
          this.foundMovieCredits = creditsData;
        } else {
          this.alertService.openWarningAlert("Wrong ID!", 3);
        }
      });
  }

  onAddMovieSubmit(form: NgForm): void {
    // приводим к нужному виду
    console.log("onAddMovieSubmit.form: ", form.value);
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(form.value.Date, form.value.MovieName),
      imdb_id: form.value.ImdbId,
      tmdb_id: form.value.TmdbId,
      dateAdded: Math.round(+new Date() / 1000),
      title: form.value.MovieName,
      releaseDate: form.value.Date,
      country:
        form.value.Country.trim() === "United States of America" ? "USA" : form.value.Country,
      IMDBRating: form.value.IMDBRating,
      genres: this.movieService.genresToArray(form.value),
      director: form.value.Director,
      posterLink: form.value.Poster,
      backdropLink: form.value.Backdrop,
      runtime: form.value.Runtime,
      budget: form.value.Budget,
      revenue: form.value.Revenue,
      overview: form.value.Overview
    };
    this.movieService.setMovieData(movieData);
    form.reset();
  }
}
