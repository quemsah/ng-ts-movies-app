import { Comment } from "./../../models/comment";
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
    private afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  generateMovieID = (date, moviename) =>
    date.substring(0, 4) +
    "-" +
    moviename
      .replace(/[^a-zA-Z0-9 ]/g, "") // удаляем символы всякие
      .replace(/\s+/g, "-") // заменяем пробелы на тире
      .toLowerCase();

  generateCommentID = date =>
    date
      .replace(/[^a-zA-Z0-9 ]/g, "") // удаляем символы всякие
      .replace(/\s+/g, "") // заменяем пробелы на тире
      .toLowerCase();

  compareGenres = (genres, fetchedGenres) =>
    genres.map(x =>
      fetchedGenres.map(y => (x.id === y.id ? (x.selected = true) : null))
    );

  sliceData = (object, num) =>
    Object.keys(object)
      .slice(0, num)
      .map(key => ({ [key]: object[key] }));

  genresToArray = genres => {
    const genresArray = [];
    // tslint:disable-next-line: forin
    for (let propt in genres) {
      genres[propt] === true && propt.startsWith("g") === true
        ? genresArray.push(propt.substring(1))
        : null;
    }
    return genresArray;
  };

  addMovie(movieData: Movie) {
    console.log(movieData);
    this.afs
      .collection(`movies/`)
      .doc(movieData.mid)
      .set(movieData)
      .then(smth =>
        this.alertService.openSuccessAlert("Movie successfully added", 2)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  addComment(commentData: Comment, mid: string) {
    this.afs
      .collection(`movies/`)
      .doc(mid)
      .collection(`comments/`)
      .doc(commentData.cid)
      .set(commentData)
      .then(smth =>
        this.alertService.openSuccessAlert("Comment successfully added", 2)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
  deleteComment(cid: string, mid: string) {
    this.afs
      .collection(`movies/`)
      .doc(mid)
      .collection(`comments/`)
      .doc(cid)
      .delete()
      .then(smth =>
        this.alertService.openSuccessAlert("Comment successfully deleted", 2)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
  fetchComment(cid: string, mid: string): Observable<any> {
    return this.afs.collection(`movies/${mid}/comments/${cid}/`).valueChanges();
  }
  fetchComments(mid: string): Observable<any> {
    return this.afs.collection(`movies/${mid}/comments`).valueChanges();
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
