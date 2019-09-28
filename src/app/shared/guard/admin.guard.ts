import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
// import { ThemeService } from "../services/theme/theme.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    // public themeService: ThemeService,
    public authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this.themeService.forceDisableDarkModeBeforeRoute();
    console.log(1);
    if (this.authService.isLoggedIn !== true) {
      console.log("Auth guard!");
      this.router.navigate(["login"]);
    }
    this.afAuth.authState.subscribe(user => {
      if (!this.authService.checkRole(user)) {
        console.log("Admin guard!");
        this.router.navigate(["not-found"]);
      }
    });
    return true;
  }
}
