import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  sidenavClose() {
    $(".button-collapse").sideNav("hide");
    //https://github.com/Dogfalo/materialize/issues/1676
    $("div[id^=sidenav-overlay]").remove();
  }
}
