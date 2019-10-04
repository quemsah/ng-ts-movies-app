import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RatingModule } from "ng-starrating";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { AddMovieComponent } from "./components/movies/add-movie/add-movie.component";
import { DiscoverComponent } from "./components/movies/discover/discover.component";
import { DiscoveredMovieComponent } from "./components/movies/discovered-movie/discovered-movie.component";
import { EditMovieComponent } from "./components/movies/edit-movie/edit-movie.component";
import { MovieComponent } from "./components/movies/movie/movie.component";
import { MoviesListComponent } from "./components/movies/movies-list/movies-list.component";
import { PaginationComponent } from "./components/movies/pagination/pagination.component";
import { StarComponent } from "./components/movies/star/star.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ForgotPasswordComponent } from "./components/users/forgot-password/forgot-password.component";
import { FriendsComponent } from "./components/users/friends/friends.component";
import { LoginComponent } from "./components/users/login/login.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { RatedComponent } from "./components/users/rated/rated.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { SettingsComponent } from "./components/users/settings/settings.component";
import { UserComponent } from "./components/users/user/user.component";
import { VerifyEmailComponent } from "./components/users/verify-email/verify-email.component";
import { NoInfoPipe } from "./shared/pipes/no-info.pipe";
import { SafePipe } from "./shared/pipes/safe.pipe";
import { AppRoutingModule } from "./shared/routing/app-routing.module";
import { AuthService } from "./shared/services/auth/auth.service";
import { ThemeService } from "./shared/services/theme/theme.service";
import { TMDBService } from "./shared/services/tmdb/TMDB.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    SidenavComponent,
    NavbarComponent,
    AddMovieComponent,
    MovieComponent,
    MoviesListComponent,
    FriendsComponent,
    EditMovieComponent,
    PaginationComponent,
    SettingsComponent,
    UserComponent,
    StarComponent,
    RatedComponent,
    LoaderComponent,
    DiscoverComponent,
    DiscoveredMovieComponent,
    SafePipe,
    NoInfoPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RatingModule,
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  providers: [AuthService, AngularFireStorage, TMDBService, Title, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
