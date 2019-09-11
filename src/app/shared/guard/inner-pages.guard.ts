import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { ThemeService } from "../services/theme/theme.service";

@Injectable({
  providedIn: "root"
})
export class InnerPagesGuard implements CanActivate {
  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.themeService.forceDisableDarkModeBeforeRoute();
    if (this.authService.isLoggedIn) {
      // window.alert("You are not allowed to access this URL!");
      this.router.navigate(["profile"]);
    }
    return true;
  }
}
