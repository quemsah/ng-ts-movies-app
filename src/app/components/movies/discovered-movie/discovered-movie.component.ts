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
    this.tmdbService.fetchMovieDetailsByTMDBID(id).subscribe(movie => {
      this.discoveredMovieData = movie;
      console.log(this.discoveredMovieData);
    });
  }
  handleAddToDatabase(): void {
    console.log(this.discoveredMovieData.id);
    // const movieData: Movie = {
    //   mid: this.movieService.generateMovieID(
    //     this.discoveredMovieData.release_date,
    //     this.discoveredMovieData.title
    //   ),
    //   imdb_id: form.value.ImdbId,
    //   tmdb_id: form.value.TmdbId,
    //   dateAdded: Math.round(+new Date() / 1000),
    //   title: form.value.MovieName,
    //   releaseDate: form.value.Date,
    //   country:
    //     form.value.Country.trim() === "United States of America" ? "USA" : form.value.Country,
    //   IMDBRating: form.value.IMDBRating,
    //   genres: this.movieService.genresToArray(form.value),
    //   director: form.value.Director,
    //   posterLink: form.value.Poster,
    //   backdropLink: form.value.Backdrop,
    //   runtime: form.value.Runtime,
    //   budget: form.value.Budget,
    //   revenue: form.value.Revenue,
    //   overview: form.value.Overview
    // };
    // console.log(movieData);
    // this.movieService.setMovieData(movieData);
  }
}
