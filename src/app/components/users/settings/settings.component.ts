import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit, AfterViewInit {
  red = this.themeService.red;
  green = this.themeService.green;
  blue = this.themeService.blue;
  random = this.themeService.random;
  constructor(public themeService: ThemeService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  handleColorChange(): void {
    this.themeService.setGradient(this.red, this.green, this.blue, this.random);
    this.themeService.setColor(this.red, this.green, this.blue);
  }

  handleResetScheme(): void {
    this.red = this.themeService.red;
    this.green = this.themeService.green;
    this.blue = this.themeService.blue;
    this.random = this.themeService.random;
    this.handleColorChange();
  }
}
