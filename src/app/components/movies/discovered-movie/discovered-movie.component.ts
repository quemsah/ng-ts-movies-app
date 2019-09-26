import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../shared/models/movie";
import { TMDBService } from "../../../shared/services/tmdb/TMDB.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { MovieService } from "../../../shared/services/movie/movie.service";

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
  ) { }

  ngOnInit() {
    this.getDiscoveredMovie();
  }

  getDiscoveredMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.tmdbService.fetchMovieDetailsByTMDBID(id).subscribe(movie => {
      this.discoveredMovieData = movie;
    });
    this.tmdbService.fetchMovieCrewbyTMDBID(id).subscribe(data => {
      this.discoveredMovieData.director = data.crew[0].name;
      this.discoveredMovieCrew = this.movieService.sliceData(data.crew, 12);
      this.discoveredMovieCast = this.movieService.sliceData(data.cast, 12);
    });
  }
  handleAddToDatabase(): void {
    const country = this.discoveredMovieData.production_countries[0].name;
    console.log(this.discoveredMovieData);
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
      //genres: this.movieService.genresToArray(form.value),
      genres: this.movieService.genresToArray(this.discoveredMovieData.genres),
      director: this.discoveredMovieData.director,
      posterLink: "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + this.discoveredMovieData.poster_path,
      backdropLink: "https://image.tmdb.org/t/p/w1400_and_h450_face" + this.discoveredMovieData.backdrop_path,
      runtime: this.discoveredMovieData.runtime + " min",
      budget: "$ " + this.discoveredMovieData.budget,
      revenue: "$ " + this.discoveredMovieData.revenue,
      overview: this.discoveredMovieData.overview
    };
    console.log(movieData);
    this.movieService.setMovieData(movieData);
  }
}
