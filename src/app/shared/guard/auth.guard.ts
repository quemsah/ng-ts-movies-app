import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "../theme/theme.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.themeService.forceDisableDarkModeBeforeRoute();
    if (this.authService.isLoggedIn !== true) {
      console.log("Auth guard!");
      console.log("authService = " + this.authService);
      this.router.navigate(["login"]);
    }
    return true;
  }
}
