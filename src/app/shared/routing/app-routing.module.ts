import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// canActivate
import { AuthGuard } from "../../shared/guard/auth.guard";
import { InnerPagesGuard } from "../../shared/guard/inner-pages.guard";
import { OuterPagesGuard } from "../../shared/guard/outer-pages.guard";
// Компоненты
import { LoginComponent } from "../../components/users/login/login.component";
import { RegisterComponent } from "../../components/users/register/register.component";
import { ProfileComponent } from "../../components/users/profile/profile.component";
import { ForgotPasswordComponent } from "../../components/users/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "../../components/users/verify-email/verify-email.component";
import { AboutComponent } from "../../components/about/about.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { AddMovieComponent } from "../../components/movies/add-movie/add-movie.component";
import { MovieComponent } from "../../components/movies/movie/movie.component";
import { MoviesListComponent } from "../../components/movies/movies-list/movies-list.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" }
    // canActivate: [InnerPagesGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { title: "Register" },
    canActivate: [InnerPagesGuard]
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
    canActivate: [InnerPagesGuard]
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent,
    data: { title: "Verify E-mail address" },
    canActivate: [InnerPagesGuard]
  },
  {
    path: "about",
    component: AboutComponent,
    data: { title: "About" },
    canActivate: [OuterPagesGuard]
  },
  {
    path: "add-movie",
    component: AddMovieComponent,
    data: { title: "New movie" },
    canActivate: [AuthGuard]
  },
  {
    path: "movie/:id",
    component: MovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "movies",
    component: MoviesListComponent,
    data: { title: "Movies" },
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
    canActivate: [OuterPagesGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
    data: { title: "Page not found" },
    canActivate: [OuterPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
