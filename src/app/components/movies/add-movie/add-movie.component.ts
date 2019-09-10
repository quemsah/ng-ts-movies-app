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
            //console.log(data);
            let arr = data.genres;
            //console.log(arr);
            for (let key in arr) {
              if (arr.hasOwnProperty(key)) {

                this.genres.forEach(function (item, key) {
                  console.log(arr[key].id); // value (ex. turkey)
                  console.log(item); // value (ex. turkey)
                });
              }
            }
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
