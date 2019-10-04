import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  public ngOnInit() {}
}
