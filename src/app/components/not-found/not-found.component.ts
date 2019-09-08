import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../shared/theme/theme.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  constructor(public themeService: ThemeService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
