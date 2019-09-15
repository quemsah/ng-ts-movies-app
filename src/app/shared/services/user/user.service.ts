import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Friend } from "../../models/friend";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // Мы с тобой решили, что в юзерах будут inRequests, OutRequests и friends,
  // так вот я начал эти все реквесты делать и присел немношк и ко мне пришла идея
  // При добавлении в друзья у обоих пользователей ставить во user/friends
  // 1) айдишники друг друга
  // 2) айдишкник инициатора добавления
  // 3) булевы поля verified: false
  // Когда если второй примет запрос в друзья, обоим ставить true.
  // На этапе отображения если айдишник друга = айдишник инициатора и false, то это исходящий непринятый
  // На этапе отображения если айдишник друга != айдишник инициатора и false, то это входящий непринятый
  // Есть шанс провала?
  constructor(
    private afs: AngularFirestore,
    private alertService: AlertService,
    private authService: AuthService
  ) {}
  // fetchFriends(): Observable<any> {
  //   return this.afs.collection(`users/${this.uid}/friends`).valueChanges();
  // }
  getUserIdByEmail(email: string): Observable<any> {
    return this.afs
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges();
  }

  getUserInfo(uid: string): Observable<any> {
    return this.afs.doc(`users/${uid}/`).valueChanges();
  }
  // создание исходящего запроса у одного
  // и входящего у второго
  addFriend(email: string) {
    this.getUserIdByEmail(email).subscribe(data => {
      if (data.length !== 0) {
        const now = new Date().toLocaleString();
        const uid = this.authService.userData.uid;
        const fid = data[0].uid;
        this.makeFriend({
          uid: uid,
          initiator: uid,
          date: now,
          accepted: false,
          fid: fid
        }).catch(error => this.alertService.openWarningAlert(error.message, 2));
        this.makeFriend({
          uid: fid,
          initiator: uid,
          date: now,
          accepted: false,
          fid: uid
        })
          .then(smth =>
            this.alertService.openSuccessAlert(
              "Request was successfully sent",
              1
            )
          )
          .catch(error => this.alertService.openWarningAlert(error.message, 2));
      } else {
        this.alertService.openWarningAlert(
          "There is no user registered with that email address!",
          2
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

  deleteRequests(fid: string) {
    const uid = this.authService.userData.uid;
    this.deleteRequest(uid, fid).catch(error =>
      this.alertService.openWarningAlert(error.message, 2)
    );
    this.deleteRequest(fid, uid)
      .then(smth =>
        this.alertService.openSuccessAlert("Successfully deleted!", 2)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }

  deleteRequest(uid: string, fid: string) {
    return this.afs
      .collection(`users/`)
      .doc(uid)
      .collection(`friends/`)
      .doc(fid)
      .delete();
  }

  acceptRequests(fid: string) {
    const now = new Date().toLocaleString();
    const uid = this.authService.userData.uid;
    console.log(fid);
    this.makeFriend({
      uid: uid,
      initiator: fid,
      date: now,
      accepted: true,
      fid: fid
    }).catch(error => this.alertService.openWarningAlert(error.message, 2));
    this.makeFriend({
      uid: fid,
      initiator: fid,
      date: now,
      accepted: true,
      fid: uid
    })
      .then(smth =>
        this.alertService.openSuccessAlert("Friend was successfully added", 2)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
}