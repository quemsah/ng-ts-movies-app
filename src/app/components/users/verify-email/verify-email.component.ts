import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
}
