import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  constructor(public themeService: ThemeService) {}

  public ngOnInit() {}

  public ngAfterViewInit() {
    // this.themeService.checkDarkMode();
  }
}
