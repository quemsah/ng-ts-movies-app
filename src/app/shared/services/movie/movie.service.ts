import { Comment } from "./../../models/comment";
import { Movie } from "../../models/movie";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";
import { OrderByDirection } from "../../order-by-direction";
import { Router } from "@angular/router";
import { MovieListItem } from "../../models/movie-list-item";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  genres = [
    { name: "Adventure", prefix: "g", selected: false, id: 12 },
    { name: "Animation", prefix: "g", selected: false, id: 16 },
    { name: "Comedy", prefix: "g", selected: false, id: 35 },
    { name: "Crime", prefix: "g", selected: false, id: 80 },
    { name: "Documentary", prefix: "g", selected: false, id: 99 },
    { name: "Drama", prefix: "g", selected: false, id: 18 },
    { name: "Fantasy", prefix: "g", selected: false, id: 14 },
    { name: "History", prefix: "g", selected: false, id: 36 },
    { name: "Horror", prefix: "g", selected: false, id: 27 },
    { name: "Music", prefix: "g", selected: false, id: 10402 },
    { name: "Romance", prefix: "g", selected: false, id: 10749 },
    { name: "Sci-Fi", prefix: "g", selected: false, id: 878 },
    { name: "Thriller", prefix: "g", selected: false, id: 53 }
  ];
  sortingFields = [
    { id: 0, value: "dateAdded", name: "Date Added" },
    { id: 1, value: "title", name: "Title" },
    { id: 2, value: "releaseDate", name: "Release Date" },
    { id: 3, value: "country", name: "Country" },
    { id: 4, value: "IMDBRating", name: "IMDB Rating" },
    { id: 5, value: "genres", name: "Genre" },
    { id: 6, value: "director", name: "Director" },
    { id: 7, value: "budget", name: "Budget" },
    { id: 8, value: "revenue", name: "Revenue" }
  ];
  constructor(
    private afs: AngularFirestore,
    private alertService: AlertService,
    private router: Router
  ) {}

  generateMovieID = (date, moviename) =>
    date.substring(0, 4) +
    "-" +
    moviename
      .trim()
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
      .map(key => ({[key]: object[key]}));

  genresToArray = genres => {
    const genresArray = [];
    // tslint:disable-next-line: forin
    for (const propt in genres) {
      genres[propt] === true && propt.startsWith("g") === true
        ? genresArray.push(propt.substring(1))
        : // tslint:disable-next-line: no-unused-expression
          null;
    }
    return genresArray;
  };

  getElementId(event): string {
    const target = event.target || event.srcElement || event.currentTarget;
    return target.attributes.id.nodeValue;
  }

  setMovieData(movieData: Movie): void {
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

  deleteMovie(mid: string): void {
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

  // для информации для списков watch later и favourites
  getMovieInfo(mid: string): Observable<any> {
    return this.afs.doc(`movies/${mid}/`).valueChanges();
  }

  fetchMovie(id: string): Observable<any> {
    // return this.afs.doc(`movies/${id}`).valueChanges();
    const movie = this.afs.collection("movies").doc(`${id}`);
    const that = this;
    movie.ref.get().then(doc => {
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

  toggleMovieToList(type: string, listMovieData: MovieListItem, uid: string): void {
    const movieDoc = this.afs
      .collection(`users/`)
      .doc(uid)
      .collection(type + `/`)
      .doc(listMovieData.mid);
    movieDoc
      .get()
      .toPromise()
      .then(doc => {
        // если это оценка фильма, то мы её записываем в любом случае
        if (type === "rated") {
          movieDoc
            .set(listMovieData)
            .then(smth => this.alertService.openSuccessAlert("Rated successfully", 0.5))
            .catch(error => this.alertService.openWarningAlert(error.message, 2));
        } else {
          // а если это посмотреть позже/любимые, проверяем
          // есть такой фильм уже есть списке
          // метод из Firebase
          if (doc.exists) {
            // если есть то удаляем
            movieDoc
              .delete()
              .then(smth =>
                this.alertService.openInfoAlert("Movie successfully deleted from list", 0.5)
              )
              .catch(error => this.alertService.openWarningAlert(error.message, 2));
          } else {
            // если нету – добавляем в список
            // console.log("No such movie!");
            movieDoc
              .set(listMovieData)
              .then(smth =>
                this.alertService.openSuccessAlert("Movie successfully added to list", 0.5)
              )
              .catch(error => this.alertService.openWarningAlert(error.message, 2));
          }
        }
      })
      .catch(error =>
        this.alertService.openWarningAlert("Error getting movie data!: " + error.message, 2)
      );
  }

  fetchFavourites(uid: string, mid: string): Observable<any> {
    return this.afs.doc(`users/${uid}/favourites/${mid}/`).valueChanges();
  }

  fetchWatchLater(uid: string, mid: string): Observable<any> {
    return this.afs.doc(`users/${uid}/watchlater/${mid}/`).valueChanges();
  }

  fetchRating(uid: string, mid: string): Observable<any> {
    return this.afs.doc(`users/${uid}/rated/${mid}/`).valueChanges();
  }

  checkMovie(mid: string) {
    const movie = this.afs.collection("movies").doc(`${mid}`);
    return movie.ref.get();
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

  fetchComments(mid: string): Observable<any> {
    return this.afs.collection(`movies/${mid}/comments`).valueChanges();
  }
}
