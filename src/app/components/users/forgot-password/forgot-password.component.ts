import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
}
