import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
