import { Movie } from "../../models/movie";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(
    public afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  addMovie(movieData: Movie) {
    console.log(movieData);
    this.afs
      .collection(`movies/`)
      .doc(movieData.mid)
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
    return this.afs
      .collection("movies", ref => ref.orderBy("dateAdded"))
      .valueChanges();
  }
}
