import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  sidenavClose() {
    $(".button-collapse").sideNav("hide");
    //https://github.com/Dogfalo/materialize/issues/1676
    $("div[id^=sidenav-overlay]").remove();
  }
}
