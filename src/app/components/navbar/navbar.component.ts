import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ThemeService } from "../../shared/theme/theme.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {}
}
