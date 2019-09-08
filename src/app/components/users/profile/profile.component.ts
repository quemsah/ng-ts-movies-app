import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  data: any;
  productPhotoPaths: string[] = [];
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.data = {};
  }

  ngOnInit() {}

  emailValidator(email: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

  onNameSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.UpdateUserName(form.value.userName);
  }

  onProfileSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.UpdateUserPassword(
      form.value.password,
      form.value.oldPassword
    );
  }

  // saveNewImage() {
  //   if (this.data && this.data.image) {
  //     this.uploadService.uploadProfileImage(
  //       this.user,
  //       this.data.image.split(/,(.+)/)[1]
  //     );
  //   }
  //   this.changingImage = false;
  // }

  onClickPhoto(file: File) {
    this.authService.UploadNewAvatar(file);
  }
}
