import { Movie } from "./movie";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "./alert.service";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(
    public afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  addMovie(formData) {
    const movieData: Movie = {
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
      .add(movieData)
      .then(() =>
        this.alertService.openSuccessAlert("Movie successfully added", 1)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
}
