import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {$("div[id^=drag-target]").remove();}

  sidenavClose() {
    $(".button-collapse").sideNav("hide");
    // https://github.com/Dogfalo/materialize/issues/1676
    $(".button-collapse").off('click').sideNav();
    // https://stackoverflow.com/questions/32591402/materialize-sidenav-produces-multiple-sidenav-overlay
    $("div[id^=sidenav-overlay]").remove();
    $("div[id^=drag-target]").remove();
  }
}
