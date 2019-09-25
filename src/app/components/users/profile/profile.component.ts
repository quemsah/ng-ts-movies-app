import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  ngOnInit() {
    // console.log(this.authService.userData.isAdmin);
    console.log(this.authService.isAdmin);
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  onNameSubmit(form: NgForm): void {
    console.log(form.value);
    this.authService.UpdateUserName(form.value.userName.trim());
  }

  onProfileSubmit(form: NgForm): void {
    console.log(form.value);
    this.authService.UpdateUserPassword(form.value.password, form.value.oldPassword);
  }

  onClickPhoto(file: File): void {
    this.authService.UploadNewAvatar(file);
  }

  onDeletePhoto(): void {
    this.authService.DeleteAvatar();
  }
}
