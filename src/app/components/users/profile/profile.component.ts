import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  public onNameSubmit(form: NgForm): void {
    console.log("form.value.userName: ", form.value.userName);
    this.authService.UpdateUserName(form.value.userName.trim());
  }

  public onProfileSubmit(form: NgForm): void {
    console.log("form.value: ", form.value);
    this.authService.UpdateUserPassword(form.value.password, form.value.oldPassword);
  }

  public onClickPhoto(file: Event): void {
    this.authService.UploadNewAvatar(file);
  }

  public onDeletePhoto(): void {
    this.authService.DeleteAvatar();
  }
}
