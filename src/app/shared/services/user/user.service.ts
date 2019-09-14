import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private alertService: AlertService,
    private authService: AuthService
  ) {}
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
  getUserIdByEmail(email: string): Observable<any> {
    return this.afs
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges();
  }
  addFriend(email: string) {
    this.getUserIdByEmail(email).subscribe(data => {
      if (data.length !== 0) {
        const uid = this.authService.userData.uid;
        const now = new Date().toLocaleString();
        const accepted = false;
        const fid = data[0].uid;
        this.makeFriend(uid, uid, fid, accepted, now).catch(error =>
          this.alertService.openWarningAlert(error.message, 2)
        );
        this.makeFriend(fid, uid, uid, accepted, now)
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
  makeFriend(
    uid: string,
    init: string,
    fid: string,
    accepted: boolean,
    now: string
  ) {
    return this.afs
      .collection(`users/`)
      .doc(uid)
      .collection(`friends/`)
      .doc(fid)
      .set({
        uid: uid,
        initiator: init,
        date: now,
        accepted: accepted,
        fid: fid
      });
  }
}
