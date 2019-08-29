import { Component, OnInit } from "@angular/core";
// import * as $ from "jquery";
// import "../assets/js/mdb.min.js";

// import * from "../../node_modules/bootstrap/dist/js/bootstrap.min.js"

declare var $: any;
declare const enableDarkMode: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "to-be-implemented";
  ngOnInit() {
    // иначе даркмод начнется до прорисовки всего
    // и будет половина даркмод, половина нет
    $(document).ready(() => {
      // включен по умолчанию
      //enableDarkMode();
      //$("#dark-mode").click(() => enableDarkMode());
      // боковое меню
      $(".button-collapse").sideNav();
    });
  }
}
