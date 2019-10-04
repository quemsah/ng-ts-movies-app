import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ThemeService } from "../../../shared/services/theme/theme.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit, AfterViewInit {
  public red = this.themeService.red;
  public green = this.themeService.green;
  public blue = this.themeService.blue;
  public random = this.themeService.random;
  constructor(public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }

  public handleColorChange(): void {
    this.themeService.setGradient(this.red, this.green, this.blue, this.random);
    this.themeService.setColor(this.red, this.green, this.blue);
  }

  public handleResetScheme(): void {
    this.red = this.themeService.red;
    this.green = this.themeService.green;
    this.blue = this.themeService.blue;
    this.random = this.themeService.random;
    this.handleColorChange();
  }
}
