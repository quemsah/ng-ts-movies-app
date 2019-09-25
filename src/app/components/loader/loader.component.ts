import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html"
})
export class LoaderComponent implements OnInit {
  infinite = false;
  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    setTimeout(() => (this.infinite = true), 3000);
  }
}
