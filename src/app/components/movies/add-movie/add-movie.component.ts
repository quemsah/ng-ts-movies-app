import { Movie } from "./../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

declare var $: any;

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit, AfterViewInit {
  foundMovieData = {
    id: "",
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
  foundMovieCrew = {
    crew: [{ name: "" }]
  };
  foundPosterPath = "";
  foundBackdropPath = "";
  foundRuntime = "";
  foundRevenue = "";
  foundBudget = "";
  dateChanged = false;
  genres = [
    { name: "Adventure", prefix: "g", selected: false, id: 12 },
    { name: "Animation", prefix: "g", selected: false, id: 16 },
    { name: "Comedy", prefix: "g", selected: false, id: 35 },
    { name: "Crime", prefix: "g", selected: false, id: 80 },
    { name: "Documentary", prefix: "g", selected: false, id: 99 },
    { name: "Drama", prefix: "g", selected: false, id: 18 },
    { name: "Fantasy", prefix: "g", selected: false, id: 14 },
    { name: "History", prefix: "g", selected: false, id: 36 },
    { name: "Horror", prefix: "g", selected: false, id: 27 },
    { name: "Music", prefix: "g", selected: false, id: 10402 },
    { name: "Romance", prefix: "g", selected: false, id: 10749 },
    { name: "Sci-Fi", prefix: "g", selected: false, id: 878 },
    { name: "Thriller", prefix: "g", selected: false, id: 53 }
  ];

  constructor(
    private tmdbService: TMDBService,
    private alertService: AlertService,
    private movieService: MovieService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Data Picker Initialization
    $(".datepicker").pickadate();
    this.themeService.checkDarkMode();
  }
  // Делается запрос к TMDB методом getMovieByIMDBID, который по индентификатору IMDB(строка) вовзращает
  // информацию о фильме. Далее запрос getMovieDetailsbyTMDBID по только что
  // полученному TMDB идентификатору(число) возвращает полную информацию о фильме
  onImdbIDSubmit(form: NgForm) {
    console.log(form.value);
    // this.tmdbService.getMovieByIMDBID(form.value.ImdbId).subscribe(data => {
    //   if (data.movie_results.length > 0) {
    //     forkJoin(
    //       this.tmdbService.getMovieDetailsbyTMDBID(data.movie_results[0].id),
    //       this.tmdbService.getMovieCrewbyTMDBID(data.movie_results[0].id)
    //     ).subscribe(([detailData, crewData]) => {
    //       this.foundMovieData = detailData;
    //       this.foundPosterPath =
    //         "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
    //         this.foundMovieData.poster_path;
    //       console.log(this.genres);
    //       this.movieService.compareGenres(this.genres, detailData.genres);
    //       this.foundMovieCrew = crewData;
    //     });
    //     console.log(data);
    //   } else {
    //     this.alertService.openWarningAlert("Wrong ID!", 1);
    //   }
    // });

    // Переписан без подписки внутри подписки
    // Часть до подписки перенесена в TMDB.service
    // и добавлено изменение полей к удобночитаемому виду (min,$)
    // Это вынужденная мера, так как в случае форматирования на
    // этапе вывода информации

    this.tmdbService
      .getMovieByIMDBID(form.value.ImdbId)
      .subscribe(([detailData, crewData]) => {
        if (detailData) {
          this.foundMovieData = detailData;
          this.foundPosterPath =
            "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
            this.foundMovieData.poster_path;
          this.foundBackdropPath =
            "https://image.tmdb.org/t/p/w1400_and_h450_face" +
            this.foundMovieData.backdrop_path;
          this.foundRuntime = this.foundMovieData.runtime + " min";
          this.foundRevenue = "$ " + this.foundMovieData.revenue;
          this.foundBudget = "$ " + this.foundMovieData.budget;
          console.log(detailData);
          this.movieService.compareGenres(this.genres, detailData.genres);
          this.foundMovieCrew = crewData;
        } else {
          this.alertService.openWarningAlert("Wrong ID!", 1);
        }
      });
  }

  onAddMovieSubmit(form: NgForm) {
    // приводим к нужному виду
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(
        form.value.Date,
        form.value.MovieName
      ),
      dateAdded: Math.round(+new Date() / 1000),
      title: form.value.MovieName,
      releaseDate: form.value.Date,
      country: form.value.Country = "United States of America"
        ? "USA"
        : form.value.Country,
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
    this.movieService.addMovie(movieData);
  }
}
