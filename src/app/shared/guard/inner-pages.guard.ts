import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InnerPagesGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this.themeService.forceDisableDarkModeBeforeRoute();
    console.log("Inner guard!");
    if (this.authService.isLoggedIn) {
      console.log("Is logged in = true");
      console.log("Welcome to movies page!");
      this.router.navigate(["movies"]);
    }
    return true;
  }
}
