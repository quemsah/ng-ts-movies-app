import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";
import { MovieDetails } from "../../../shared/models/api-movie-details";
import { Movie } from "../../../shared/models/movie";
import { Cast } from "../../../shared/models/api-cast";
import { Crew } from "../../../shared/models/api-crew";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-discovered-movie",
  templateUrl: "./discovered-movie.component.html",
  styleUrls: ["./discovered-movie.component.css"]
})
export class DiscoveredMovieComponent implements OnInit {
  isInOurDatabase: boolean;
  mid: string;
  discoveredMovieData: MovieDetails;
  discoveredMovieCrew: Crew[];
  discoveredMovieCast: Cast[];
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
      this.tmdbService.fetchMovieCreditsbyTMDBID(id)
    ).subscribe(([movie, data]) => {
      this.discoveredMovieData = movie;
      console.log("this.discoveredMovieData: ", this.discoveredMovieData);
      // берем режиссера из другого запроса (актеры и команда)
      this.discoveredMovieData.director = data.crew[0].name.toString();
      this.discoveredMovieCrew = this.movieService.sliceData(data.crew, 12);
      console.log("this.discoveredMovieCrew: ", this.discoveredMovieCrew);
      this.discoveredMovieCast = this.movieService.sliceData(data.cast, 12);
      console.log("this.discoveredMovieCast: ", this.discoveredMovieCast);
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
    console.log("genres: ", genres);
    const movieData: Movie = {
      mid: this.movieService.generateMovieID(
        this.discoveredMovieData.release_date,
        this.discoveredMovieData.title
      ),
      imdb_id: this.discoveredMovieData.imdb_id,
      tmdb_id: this.discoveredMovieData.id.toString(10),
      dateAdded: Math.round(+new Date() / 1000),
      title: this.discoveredMovieData.title,
      releaseDate: this.discoveredMovieData.release_date,
      country: country === "United States of America" ? "USA" : country,
      IMDBRating: this.discoveredMovieData.vote_average.toString(10),
      genres,
      director: this.discoveredMovieData.director,
      posterLink: this.tmdbService.URL_IMG_H450 + this.discoveredMovieData.poster_path,
      backdropLink: this.tmdbService.URL_BACKDROP + this.discoveredMovieData.backdrop_path,
      runtime: this.discoveredMovieData.runtime + " min",
      budget: "$ " + this.discoveredMovieData.budget,
      revenue: "$ " + this.discoveredMovieData.revenue,
      overview: this.discoveredMovieData.overview
    };
    console.log("movieData: ", movieData);
    this.movieService.setMovieData(movieData);
  }
}
