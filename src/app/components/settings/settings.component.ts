import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  red: number = 255;
  green: number = 255;
  blue: number = 255;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    console.log(this.themeService.themeGradient);
  }
  handleColorChange() {
    this.themeService.setGradient(this.red,this.green,this.blue)
  }
}
