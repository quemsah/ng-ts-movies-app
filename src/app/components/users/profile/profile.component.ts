import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.themeService.checkDarkMode();
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

  onClickPhoto(file: File) {
    this.authService.UploadNewAvatar(file);
  }
}
