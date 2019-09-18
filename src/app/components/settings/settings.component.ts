import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  red = this.themeService.red;
  green = this.themeService.green;
  blue = this.themeService.blue;
  ngOnInit() {
    this.themeService.setGradient(this.red, this.green, this.blue);
  }
  handleColorChange() {
    this.themeService.setGradient(this.red, this.green, this.blue);
  }
}
