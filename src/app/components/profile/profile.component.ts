import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  sub: Subscription;
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sub = this.authService
        .getAllUserData(this.authService.userData.uid)
        .subscribe(response => {
          this.userData = response;
          console.log(this.userData[0].aboutMe);
        });
    }, 1000);
  }

  emailValidator(email: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let user = this.authService.getCurrentUser;
    this.authService.UpdateUserPassword(form.value.password);
    this.authService.UpdateUserName(form.value.userName);
    this.authService.UpdateUserAboutMe(user, form.value.aboutMe);
  }
}
