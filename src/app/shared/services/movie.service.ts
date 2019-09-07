import { Movie } from './movie';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(public afs: AngularFirestore) {}

  // addMovie() {
  //   db.collection("cities")
  //   .add(form.value)
  //   .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch(function(error) {
  //     console.error("Error adding document: ", error);
  //   });



  //   this.alertService.openSuccessAlert("Name successfully changed!", 1);
  addMovie(formData) {
    const movieData:Movie = {
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
      overview: formData.Overview,
    };
    this.afs.collection(`movies/`).add(movieData);
  }
}
