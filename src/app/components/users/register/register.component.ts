import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
}
