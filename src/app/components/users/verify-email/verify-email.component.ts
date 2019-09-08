import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/theme/theme.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
