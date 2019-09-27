import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../shared/models/movie";
import { Crew } from "../../../shared/models/crew";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-discovered-movie",
  templateUrl: "./discovered-movie.component.html",
  styleUrls: ["./discovered-movie.component.css"]
})
export class DiscoveredMovieComponent implements OnInit {
  isInOurDatabase: boolean;
  mid: string;
  discoveredMovieData: any;
  discoveredMovieCrew: Crew[];
  discoveredMovieCast: Crew[];
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getDiscoveredMovie();
  }

  getDiscoveredMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    // tslint:disable-next-line: deprecation
    forkJoin(
      this.tmdbService.fetchMovieDetailsByTMDBID(id),
      this.tmdbService.fetchMovieCrewbyTMDBID(id)
    ).subscribe(([movie, data]) => {
      // console.log(this.discoveredMovieData);
      this.discoveredMovieData = movie;
      // берем режиссера из другого запроса (актеры и команда)
      this.discoveredMovieData.director = data.crew[0].name;
      this.discoveredMovieCrew = this.movieService.sliceData(data.crew, 12);
      this.discoveredMovieCast = this.movieService.sliceData(data.cast, 12);
      // проверям есть ли в нашей БД такой
      this.mid = this.movieService.generateMovieID(
        this.discoveredMovieData.release_date,
        this.discoveredMovieData.title
      );
      this.searchInOurDatabase(this.mid);
    });
  }

  searchInOurDatabase(id: string): void {
    this.movieService.checkMovie(id).then(movie => {
      if (movie.exists) {
        this.isInOurDatabase = true;
      } else {
        this.isInOurDatabase = false;
      }
      this.spinner.hide();
    });
  }

  handleAddToDatabase(): void {
    const country = this.discoveredMovieData.production_countries[0].name;
    const genres = [];
    this.discoveredMovieData.genres.forEach(element => {
      genres.push(element.name);
    });
    // console.log(genres);
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(
        this.discoveredMovieData.release_date,
        this.discoveredMovieData.title
      ),
      imdb_id: this.discoveredMovieData.imdb_id,
      tmdb_id: this.discoveredMovieData.id,
      dateAdded: Math.round(+new Date() / 1000),
      title: this.discoveredMovieData.title,
      releaseDate: this.discoveredMovieData.release_date,
      country: country === "United States of America" ? "USA" : country,
      IMDBRating: this.discoveredMovieData.vote_average,
      genres,
      director: this.discoveredMovieData.director,
      posterLink: this.tmdbService.URL_IMG_H450 + this.discoveredMovieData.poster_path,
      backdropLink: this.tmdbService.URL_BACKDROP + this.discoveredMovieData.backdrop_path,
      runtime: this.discoveredMovieData.runtime + " min",
      budget: "$ " + this.discoveredMovieData.budget,
      revenue: "$ " + this.discoveredMovieData.revenue,
      overview: this.discoveredMovieData.overview
    };
    // console.log(movieData);
    this.movieService.setMovieData(movieData);
  }
}
