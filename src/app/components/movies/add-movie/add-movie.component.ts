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
  genres = [
    { name: "Drama", prefix: "g", selected: false, id: 1 },
    { name: "Sci-fi", prefix: "g", selected: true, id: 2 },
    { name: "Comedy", prefix: "g", selected: true, id: 3 }
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
      data.movie_results.length > 0
        ? this.tmdbService
            .getMovieDetailsbyTMDBID(data.movie_results[0].id)
            .subscribe(data => {
              this.foundMovieData = data;
              console.log(data);
            })
        : this.alertService.openWarningAlert("Wrong ID!", 1);
    });
  }

  filterItems(arr, query) {
    return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  onAddMovieSubmit(form: NgForm) {
    let obj = form.value;
    let arr = [];

    for (var propt in obj) {
      if (propt.startsWith("g") == true) {
        if (obj[propt] == true) {
          arr.push(propt.substring(1));
        }
      }
    }
    const movieID = this.generateMovieID(obj.Date, obj.MovieName);
    const movieData: Movie = {
      mid: movieID,
      title: obj.MovieName,
      releaseDate: obj.Date,
      country: obj.Country,
      IMDBRating: obj.IMDBRating,
      genre: obj.Genre,
      genres: arr,
      director: obj.Director,
      posterLink: obj.Poster,
      runtime: obj.Runtime,
      budget: obj.Budget,
      revenue: obj.Revenue,
      overview: obj.Overview
    };

    console.log(arr);
    console.log(movieData);

    // form.value.forEach(el => {
    //   const firstLetter = el.length ? el[0] : '';
    //   console.log(firstLetter);

    // letters = letters.map(letter => {
    //   letter.disabled = letter.text.toLowerCase() !== firstLetter.toLowerCase();

    //   return letter;
    // });
    // });

    //let arr = this.filterItems(Array.from(form.value),'');

    //console.log(arr);
    // const checkedOptions = this.options.filter(x => x.checked);
    // this.selectedValues = checkedOptions.map(x => x.value);
    // this.toggle.emit(checkedOptions.map(x => x.value));
    this.movieService.addMovie(movieData);
  }
}
