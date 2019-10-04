import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this.themeService.forceDisableDarkModeBeforeRoute();
    if (this.authService.isLoggedIn !== true) {
      console.log("Auth guard!");
      console.log("this.authService.isLoggedIn !== true");
      this.router.navigate(["login"]);
    }
    return true;
  }
}
