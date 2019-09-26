import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../shared/models/movie";
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
  discoveredMovieData: any;
  discoveredMovieCrew: any;
  discoveredMovieCast: any;
  constructor(
    public themeService: ThemeService,
    public tmdbService: TMDBService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDiscoveredMovie();
  }

  getDiscoveredMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    forkJoin(
      this.tmdbService.fetchMovieDetailsByTMDBID(id),
      this.tmdbService.fetchMovieCrewbyTMDBID(id)
    ).subscribe(([movie, data]) => {
      this.discoveredMovieData = movie;
      this.discoveredMovieData.director = data.crew[0].name;
      this.discoveredMovieCrew = this.movieService.sliceData(data.crew, 12);
      this.discoveredMovieCast = this.movieService.sliceData(data.cast, 12);
    });
  }

  handleAddToDatabase(): void {
    const country = this.discoveredMovieData.production_countries[0].name;
    let genres = [];
    this.discoveredMovieData.genres.forEach(element => {
      genres.push(element.name);
    });
    console.log(genres);
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
      // genres: this.movieService.genresToArray(form.value),
      genres,
      director: this.discoveredMovieData.director,
      posterLink: this.tmdbService.URL_IMG_H450 + this.discoveredMovieData.poster_path,
      backdropLink: this.tmdbService.URL_BACKDROP + this.discoveredMovieData.backdrop_path,
      runtime: this.discoveredMovieData.runtime + " min",
      budget: "$ " + this.discoveredMovieData.budget,
      revenue: "$ " + this.discoveredMovieData.revenue,
      overview: this.discoveredMovieData.overview
    };
    console.log(movieData);
    this.movieService.setMovieData(movieData);
  }
}
