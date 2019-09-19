import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit, AfterViewInit {
  red = this.themeService.red;
  green = this.themeService.green;
  blue = this.themeService.blue;
  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    //this.updateColor();
  }

  ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  handleColorChange() {
    this.themeService.setGradient(this.red, this.green, this.blue);
    this.themeService.setColor(this.red, this.green, this.blue);
    //this.updateColor();
  }
  // updateColor() {
  //   this.themeService.setGradient(this.red, this.green, this.blue);
  //   this.themeService.setColor(this.red, this.green, this.blue);
  // }
}
