import { Comment } from "./../../models/comment";
import { Movie } from "../../models/movie";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";
import { OrderByDirection } from "../../order-by-direction";
import { Router } from "@angular/router";
import { MovieListItem } from "../../models/movie-list-comment";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(
    private afs: AngularFirestore,
    private alertService: AlertService,
    private router: Router
  ) {}

  generateMovieID = (date, moviename) =>
    date.substring(0, 4) +
    "-" +
    moviename
      .replace(/[^a-zA-Z0-9А-Яа-я ]/g, "") // удаляем символы всякие
      .replace(/\s+/g, "-") // заменяем пробелы на тире
      .toLowerCase();

  generateCommentID = date =>
    date
      .replace(/[^a-zA-Z0-9 ]/g, "") // удаляем символы всякие
      .replace(/\s+/g, "") // заменяем пробелы на тире
      .toLowerCase();

  compareGenres = (genres, fetchedGenres) =>
    genres.map(x => fetchedGenres.map(y => (x.id === y.id ? (x.selected = true) : null)));

  sliceData = (object, num) =>
    Object.keys(object)
      .slice(0, num)
      .map(key => ({
        [key]: object[key]
      }));

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

  setMovieData(movieData: Movie) {
    console.log(movieData);
    this.afs
      .collection(`movies/`)
      .doc(movieData.mid)
      .set(movieData, {
        merge: true
      })
      .then(smth => this.alertService.openSuccessAlert("Movie info successfully added", 2))
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  deleteMovie(mid: string) {
    this.afs
      .collection(`movies/`)
      .doc(mid)
      .delete()
      .then(smth => {
        this.alertService.openSuccessAlert("Movie successfully deleted", 2);
        this.router.navigate(["movies"]);
      })
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  fetchMovie(id: string): Observable<any> {
    //return this.afs.doc(`movies/${id}`).valueChanges();
    let movie = this.afs.collection("movies").doc(`${id}`);
    let that = this;
    movie.ref.get().then(function(doc) {
      if (doc.exists) {
      } else {
        that.alertService.openWarningAlert("Wrong URL!", 2);
        that.router.navigate(["movies"]);
      }
    });
    return movie.valueChanges();
  }
  // Сортируем на сервере, остальное – на клиенте
  fetchMovies(orderField: string, sortType: string): Observable<any> {
    const type: OrderByDirection = sortType as OrderByDirection;
    return this.afs.collection("movies", ref => ref.orderBy(orderField, type)).valueChanges();
  }

  // server-side data filter
  // Попытки тщетны, так как фильтровать в Firestore
  // можно только по нескольким полям без ухищрений нельзя
  // https://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
  // И совсем невозможно добавить к этому сортировку

  // fetchMovies(filterValue: string): Observable<any> {
  //   let val = filterValue.toLowerCase();
  //   return this.afs
  //     .collection("movies", ref =>
  //       ref
  //         .where("releaseDate", ">=", filterValue)
  //         .where("releaseDate", "<=", filterValue + "\uf8ff")
  //     )
  //     .valueChanges();
  // }

  // fetchMovies(filterValue: string): Observable<any> {
  //   return this.afs
  //     .collection("movies", ref =>
  //       ref
  //         .orderBy("dateAdded")
  //         .startAt(filterValue)
  //         .endAt(filterValue + "\uf8ff")
  //     )
  //     .valueChanges();
  // }

  toggleMovieToList(type: string, listMovieData: MovieListItem, uid: string) {
    const movieDoc = this.afs
      .collection(`users/`)
      .doc(uid)
      .collection(type + `/`)
      .doc(listMovieData.mid);
    movieDoc
      .get()
      .toPromise()
      .then(doc => {
        // метод из Firebase
        // если такой фильм в списке
        if (doc.exists) {
          // удаляем
          movieDoc
            .delete()
            .then(smth =>
              this.alertService.openInfoAlert("Movie successfully deleted from list", 0.5)
            )
            .catch(error => this.alertService.openWarningAlert(error.message, 2));
        } else {
          // добавляем в список
          // console.log("No such movie!");
          movieDoc
            .set(listMovieData)
            .then(smth =>
              this.alertService.openSuccessAlert("Movie successfully added to list", 0.5)
            )
            .catch(error => this.alertService.openWarningAlert(error.message, 2));
        }
      })
      .catch(error =>
        this.alertService.openWarningAlert("Error getting movie data!: " + error.message, 2)
      );
  }

  addComment(commentData: Comment, mid: string) {
    this.afs
      .collection(`movies/`)
      .doc(mid)
      .collection(`comments/`)
      .doc(commentData.cid)
      .set(commentData)
      .then(smth => this.alertService.openSuccessAlert("Comment successfully added", 2))
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  deleteComment(cid: string, mid: string) {
    this.afs
      .collection(`movies/`)
      .doc(mid)
      .collection(`comments/`)
      .doc(cid)
      .delete()
      .then(smth => this.alertService.openSuccessAlert("Comment successfully deleted", 2))
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
  // для списков watch later и favourites
  getMovieInfo(mid: string): Observable<any> {
    return this.afs.doc(`movies/${mid}/`).valueChanges();
  }

  fetchComment(cid: string, mid: string): Observable<any> {
    return this.afs.collection(`movies/${mid}/comments/${cid}/`).valueChanges();
  }

  fetchComments(mid: string): Observable<any> {
    return this.afs.collection(`movies/${mid}/comments`).valueChanges();
  }
}
