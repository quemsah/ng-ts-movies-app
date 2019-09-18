import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  red: number = 32;
  green: number = 199;
  blue: number = 107;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setGradient(this.red,this.green,this.blue)
  }
  handleColorChange() {
    this.themeService.setGradient(this.red,this.green,this.blue)
  }
}
