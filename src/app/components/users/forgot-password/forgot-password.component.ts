import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
