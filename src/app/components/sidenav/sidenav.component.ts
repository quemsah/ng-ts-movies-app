import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../shared/services/theme/theme.service";
import { AuthService } from "../../shared/services/auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  uid: string;
  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    public themeService: ThemeService
  ) {
    // https://javebratt.com/firebase-user-undefined/
    this.afAuth.authState.subscribe(user => (user ? (this.uid = user.uid) : null));
  }

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
