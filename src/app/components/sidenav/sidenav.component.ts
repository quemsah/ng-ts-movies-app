import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ThemeService } from "../../shared/services/theme/theme.service";

declare var $: any;

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  public uid: string;
  public isAdmin: boolean;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // https://javebratt.com/firebase-user-undefined/
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.isAdmin = this.authService.checkRole(user);
      }
    });
  }

  public ngOnInit() {}

  public handleChangeSearchQuery(searchValue: string) {
    console.log("searchValue: ", searchValue);
    this.router.navigate(["search/" + searchValue]);
  }
  // https://github.com/Dogfalo/materialize/issues/1676
  // https://stackoverflow.com/questions/32591402/materialize-sidenav-produces-multiple-sidenav-overlay
  public sidenavClose(): void {
    $(".button-collapse").sideNav("hide");
    $(".button-collapse")
      .off("click")
      .sideNav();
    $("div[id^=sidenav-overlay]").remove();
  }
}
