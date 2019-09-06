import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// canActivate
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";
// Компоненты
import { LoginComponent } from "../../components/login/login.component";
import { RegisterComponent } from "../../components/register/register.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { ForgotPasswordComponent } from "../../components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "../../components/verify-email/verify-email.component";
import { AboutComponent } from "../../components/about/about.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { AddMovieComponent } from '../../components/add-movie/add-movie.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { title: "Register" },
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { title: "Profile" },
    canActivate: [AuthGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { title: "Forgot password" },
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent,
    data: { title: "Verify E-mail address" },
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "about",
    component: AboutComponent,
    data: { title: "About" }
  },
  {
    path: "add-movie",
    component: AddMovieComponent,
    data: { title: "New movie" },
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "**",
    component: NotFoundComponent,
    data: { title: "Page not found" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
