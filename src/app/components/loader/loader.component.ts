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
    // по истечении 3.5 секунд таймер поймет, что завис и
    // предложит редирект на главную страницу
    setTimeout(() => (this.infinite = true), 3500);
  }
}
