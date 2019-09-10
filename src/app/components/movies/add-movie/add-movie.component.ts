import { Movie } from "./../../../shared/models/movie";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit, AfterViewInit {
  foundMovieData: any;
  foundMovieCrew: any;
  foundPosterPath: string;
  genres = [
    { name: "Adventure", prefix: "g", selected: false, id: 1 },
    { name: "Animation", prefix: "g", selected: false, id: 2 },
    { name: "Comedy", prefix: "g", selected: false, id: 3 },
    { name: "Crime", prefix: "g", selected: false, id: 4 },
    { name: "Documentary", prefix: "g", selected: false, id: 5 },
    { name: "Drama", prefix: "g", selected: false, id: 6 },
    { name: "Fantasy", prefix: "g", selected: false, id: 7 },
    { name: "History", prefix: "g", selected: false, id: 8 },
    { name: "Horror", prefix: "g", selected: false, id: 9 },
    { name: "Music", prefix: "g", selected: false, id: 10 },
    { name: "Romance", prefix: "g", selected: false, id: 11 },
    { name: "Sci-Fi", prefix: "g", selected: false, id: 12 },
    { name: "Thriller", prefix: "g", selected: false, id: 13 }
  ];
  generateMovieID = (date, moviename) =>
    date.substr(date.length - 4) +
    "-" +
    moviename.replace(/\s+/g, "-").toLowerCase();
  constructor(
    public tmdbService: TMDBService,
    public alertService: AlertService,
    public movieService: MovieService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
  // Делается запрос к TMDB методом getMovieByIMDBID, который по индентификатору IMDB(строка) вовзращает
  // информацию о фильме. Далее запрос getMovieDetailsbyTMDBID по только что
  // полученному TMDB идентификатору(число) возвращает полную информацию о фильме
  onImdbIDSubmit(form: NgForm) {
    console.log(form.value);
    this.tmdbService.getMovieByIMDBID(form.value.ImdbId).subscribe(data => {
      if (data.movie_results.length > 0) {
          this.tmdbService
          .getMovieDetailsbyTMDBID(data.movie_results[0].id)
          .subscribe(data => {
            this.foundMovieData = data;
            this.foundPosterPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+this.foundMovieData.poster_path;
            console.log(data);
          });
          this.tmdbService
          .getMovieCrewbyTMDBID(data.movie_results[0].id)
          .subscribe(data => {
            this.foundMovieCrew = data;
          });
      } else {
        this.alertService.openWarningAlert("Wrong ID!", 1);
      }
    });
  }

  onAddMovieSubmit(form: NgForm) {
    const genresArray = [];
    // жанры в массив
    // tslint:disable-next-line: forin
    for (let propt in form.value) {
      form.value[propt] === true && propt.startsWith("g") === true
        ? genresArray.push(propt.substring(1))
        : null;
    }
    const movieData: Movie = {
      mid: this.generateMovieID(form.value.Date, form.value.MovieName),
      dateAdded: Math.round(+new Date() / 1000),
      title: form.value.MovieName,
      releaseDate: form.value.Date,
      country: form.value.Country,
      IMDBRating: form.value.IMDBRating,
      genres: genresArray,
      director: form.value.Director,
      posterLink: form.value.Poster,
      runtime: form.value.Runtime,
      budget: form.value.Budget,
      revenue: form.value.Revenue,
      overview: form.value.Overview
    };
    this.movieService.addMovie(movieData);
  }
}
