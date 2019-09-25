import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "../services/theme/theme.service";

@Injectable({
  providedIn: "root"
})
export class InnerPagesGuard implements CanActivate {
  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.themeService.forceDisableDarkModeBeforeRoute();
    console.log("Inner guard!");
    if (this.authService.isLoggedIn) {
      // console.log(this.authService.userData.emailVerified);
      console.log("this.authService.isLoggedIn = true");
      console.log("Welcome to movies page!");
      this.router.navigate(["movies"]);
    }
    return true;
  }
}
