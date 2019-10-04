import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit, AfterViewInit {
  constructor(public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
}
