import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
  // https://github.com/Dogfalo/materialize/issues/1676
  // https://stackoverflow.com/questions/32591402/materialize-sidenav-produces-multiple-sidenav-overlay
  sidenavClose() {
    $(".button-collapse").sideNav("hide");
    $(".button-collapse").off("click").sideNav();
    $("div[id^=sidenav-overlay]").remove();
  }
}
