import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertService } from "../alert/alert.service";
import { Request } from "../../models/request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private alertService: AlertService
  ) {}

  getUserIdByEmail(email: string): Observable<any> {
    return this.afs
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges();
  }
  setRequest(requestData: Request) {
    this.afs
      .collection(`users/`)
      .doc(requestData.uid)
      .collection(`outreq/`)
      .doc(requestData.fid)
      .set(requestData)
      .then(smth =>
        this.alertService.openSuccessAlert("Request was successfully sended", 1)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
    this.afs
      .collection(`users/`)
      .doc(requestData.fid)
      .collection(`inreq/`)
      .doc(requestData.uid)
      .set(requestData)
      .then(smth =>
        this.alertService.openSuccessAlert("Request was successfully sended", 1)
      )
      .catch(error => this.alertService.openWarningAlert(error.message, 2));
  }
  addFriend(requestData: Request) {
    console.log(requestData.uid);
    this.getUserIdByEmail(requestData.userEmail).subscribe(data => {
      console.log(data.length);
      if (data.length !== 0) {
        requestData.fid = data[0].uid;
        this.setRequest(requestData);
      } else {
        this.alertService.openWarningAlert(
          "There is no user registered with that email address!",
          2
        );
      }
    });
  }
}
