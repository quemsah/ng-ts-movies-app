import { Movie } from "../../models/movie";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  generateMovieID = (date, moviename) =>
    date.substr(date.length - 4) +
    "-" +
    moviename.replace(/\s+/g, "-").toLowerCase();
  constructor(
    public afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  addMovie(formData) {
    const movieID = this.generateMovieID(formData.Date, formData.MovieName);
    const movieData: Movie = {
      mid: movieID,
      title: formData.MovieName,
      releaseDate: formData.Date,
      country: formData.Country,
      IMDBRating: formData.IMDBRating,
      genre: formData.Genre,
      director: formData.Director,
      posterLink: formData.Poster,
      runtime: formData.Runtime,
      budget: formData.Budget,
      revenue: formData.Revenue,
      overview: formData.Overview
    };
    this.afs
      .collection(`movies/`)
      .doc(movieID)
      .set(movieData)
      .then(smth =>
        this.alertService.openSuccessAlert("Movie successfully added", 1)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  fetchMovie(id: string): Observable<any> {
    return this.afs.doc(`movies/${id}`).valueChanges();
  }

  fetchMovies(): Observable<any> {
    return this.afs.collection("movies").valueChanges();
  }
}
