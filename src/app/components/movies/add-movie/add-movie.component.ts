import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { AlertService } from "../../../shared/services/alert/alert.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { ThemeService } from "../../../shared/theme/theme.service";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit, AfterViewInit {
  foundMovieData: any;
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

  onAddMovieSubmit(form: NgForm) {
    console.log(form.value);
    this.movieService.addMovie(form.value);
  }
}
