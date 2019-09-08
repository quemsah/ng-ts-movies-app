import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
