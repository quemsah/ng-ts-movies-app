import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public login = false;
  public register = false;
  public friends = false;
  public profile = false;
  public logout = false;
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  public ngOnInit() {}
}
