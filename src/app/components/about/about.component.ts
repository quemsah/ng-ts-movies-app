import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../shared/theme/theme.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit, AfterViewInit {
  constructor(public themeService: ThemeService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.themeService.checkDarkMode();
  }
}
