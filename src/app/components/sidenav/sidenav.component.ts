import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  ngOnInit() {}
  // https://github.com/Dogfalo/materialize/issues/1676
  // https://stackoverflow.com/questions/32591402/materialize-sidenav-produces-multiple-sidenav-overlay
  sidenavClose(): void {
    $(".button-collapse").sideNav("hide");
    $(".button-collapse")
      .off("click")
      .sideNav();
    $("div[id^=sidenav-overlay]").remove();
  }
}
