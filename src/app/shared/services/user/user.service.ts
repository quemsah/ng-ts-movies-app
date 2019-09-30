import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { AuthService } from "../auth/auth.service";
import { Friend } from "../../models/friend";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // При добавлении в друзья у обоих пользователей ставить во user/friends
  // 1) айдишники друг друга
  // 2) айдишкник инициатора добавления
  // 3) булевы поля verified: false
  // Когда если второй примет запрос в друзья, обоим ставить true.
  // На этапе отображения если айдишник друга = айдишник инициатора и false, то это исходящий непринятый
  // На этапе отображения если айдишник друга != айдишник инициатора и false, то это входящий непринятый
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  getUserInfo(uid: string): Observable<any> {
    return this.afs.doc(`users/${uid}/`).valueChanges();
  }

  getUserIdByEmail(email: string): Observable<any> {
    return this.afs.collection("users", ref => ref.where("email", "==", email)).valueChanges();
  }

  fetchWatchLaterList(uid: string): Observable<any> {
    return this.afs.collection(`users/${uid}/watchlater`).valueChanges();
  }

  fetchFavouritesList(uid: string): Observable<any> {
    return this.afs.collection(`users/${uid}/favourites`).valueChanges();
  }

  fetchRatedList(): Observable<any> {
    return this.afs.collection(`users/${this.authService.userData.uid}/rated`).valueChanges();
    // сортировка по дате добавления collection(`users/${this.authService.userData.uid}/rated`, ref => ref.orderBy("date", "desc"))
  }
  // создание исходящего запроса у одного
  // и входящего у второго
  addFriend(email: string): void {
    this.getUserIdByEmail(email).subscribe(data => {
      if (data.length !== 0) {
        const now = new Date().toLocaleString();
        const uid = this.authService.userData.uid;
        const fid = data[0].uid;
        this.makeFriend({
          uid,
          initiator: uid,
          date: now,
          accepted: false,
          fid
        }).catch(error => this.alertService.openWarningAlert(error.message, 3));
        this.makeFriend({
          uid: fid,
          initiator: uid,
          date: now,
          accepted: false,
          fid: uid
        })
          .then(smth => this.alertService.openSuccessAlert("Request was successfully sent", 2))
          .catch(error => this.alertService.openWarningAlert(error.message, 3));
      } else {
        this.alertService.openWarningAlert(
          "There is no user registered with that email address!",
          3
        );
      }
    });
  }

  makeFriend(friend: Friend) {
    return this.afs
      .collection(`users/`)
      .doc(friend.uid)
      .collection(`friends/`)
      .doc(friend.fid)
      .set({
        uid: friend.uid,
        initiator: friend.initiator,
        date: friend.date,
        accepted: friend.accepted,
        fid: friend.fid
      });
  }

  deleteRequests(fid: string): void {
    const uid = this.authService.userData.uid;
    this.deleteRequest(uid, fid).catch(error =>
      this.alertService.openWarningAlert(error.message, 3)
    );
    this.deleteRequest(fid, uid)
      .then(smth => this.alertService.openSuccessAlert("Successfully deleted!", 2))
      .catch(error => this.alertService.openWarningAlert(error.message, 3));
  }

  deleteRequest(uid: string, fid: string) {
    return this.afs
      .collection(`users/`)
      .doc(uid)
      .collection(`friends/`)
      .doc(fid)
      .delete();
  }

  acceptRequests(fid: string): void {
    const now = new Date().toLocaleString();
    const uid = this.authService.userData.uid;
    console.log(fid);
    this.makeFriend({
      uid,
      initiator: fid,
      date: now,
      accepted: true,
      fid
    }).catch(error => this.alertService.openWarningAlert(error.message, 3));
    this.makeFriend({
      uid: fid,
      initiator: fid,
      date: now,
      accepted: true,
      fid: uid
    })
      .then(smth => this.alertService.openSuccessAlert("Friend was successfully added", 2))
      .catch(error => this.alertService.openWarningAlert(error.message, 3));
  }
}
