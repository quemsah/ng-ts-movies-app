import { Component, OnInit } from "@angular/core";
import { ThemeService } from 'src/app/shared/services/theme/theme.service';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {}
}
