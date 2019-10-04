import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "../../components/about/about.component";
import { AddMovieComponent } from "../../components/movies/add-movie/add-movie.component";
import { DiscoverComponent } from "../../components/movies/discover/discover.component";
import { DiscoveredMovieComponent } from "../../components/movies/discovered-movie/discovered-movie.component";
import { EditMovieComponent } from "../../components/movies/edit-movie/edit-movie.component";
import { MovieComponent } from "../../components/movies/movie/movie.component";
import { MoviesListComponent } from "../../components/movies/movies-list/movies-list.component";
import { StarComponent } from "../../components/movies/star/star.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { ForgotPasswordComponent } from "../../components/users/forgot-password/forgot-password.component";
import { FriendsComponent } from "../../components/users/friends/friends.component";
// Компоненты
import { LoginComponent } from "../../components/users/login/login.component";
import { ProfileComponent } from "../../components/users/profile/profile.component";
import { RatedComponent } from "../../components/users/rated/rated.component";
import { RegisterComponent } from "../../components/users/register/register.component";
import { SettingsComponent } from "../../components/users/settings/settings.component";
import { UserComponent } from "../../components/users/user/user.component";
import { VerifyEmailComponent } from "../../components/users/verify-email/verify-email.component";
// canActivate
import { AuthGuard } from "../../shared/guard/auth.guard";
import { InnerPagesGuard } from "../../shared/guard/inner-pages.guard";
import { OuterPagesGuard } from "../../shared/guard/outer-pages.guard";
import { AdminGuard } from "../guard/admin.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" },
    canActivate: [InnerPagesGuard]
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
    path: "user/:id",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "rated",
    component: RatedComponent,
    data: { title: "My Ratings" },
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    component: SettingsComponent,
    data: { title: "Settings" },
    canActivate: [OuterPagesGuard]
  },
  {
    path: "friends",
    component: FriendsComponent,
    data: { title: "Friends" },
    canActivate: [AuthGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { title: "Forgot password" },
    canActivate: [InnerPagesGuard]
  },
  {
    path: "verify-email",
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
    canActivate: [AdminGuard]
  },
  {
    path: "edit-movie/:id",
    component: EditMovieComponent,
    data: { title: "Edit movie" },
    canActivate: [AdminGuard]
  },
  {
    path: "search/:query",
    component: DiscoverComponent,
    data: { title: "Search" },
    canActivate: [AuthGuard]
  },
  {
    path: "popular",
    component: DiscoverComponent,
    data: { title: "Popular" },
    canActivate: [AuthGuard]
  },
  {
    path: "now-playing",
    component: DiscoverComponent,
    data: { title: "Now playing" },
    canActivate: [AuthGuard]
  },
  {
    path: "highest-rated",
    component: DiscoverComponent,
    data: { title: "Hightest rated" },
    canActivate: [AuthGuard]
  },
  {
    path: "genres",
    component: DiscoverComponent,
    data: { title: "Discover by genres" },
    canActivate: [AuthGuard]
  },
  {
    path: "discovered-movie/:id",
    component: DiscoveredMovieComponent,
    canActivate: [OuterPagesGuard]
  },
  {
    path: "movie/:id",
    component: MovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "star/:id",
    component: StarComponent,
    canActivate: [OuterPagesGuard]
  },
  {
    path: "movies",
    component: MoviesListComponent,
    data: { title: "Movies" },
    canActivate: [OuterPagesGuard]
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
