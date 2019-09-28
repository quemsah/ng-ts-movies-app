import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  login = false;
  register = false;
  friends = false;
  profile = false;
  settings = false;
  logout = false;
  constructor(public authService: AuthService, public themeService: ThemeService) {}

  ngOnInit() {}
}
