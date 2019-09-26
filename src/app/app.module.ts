import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// Сторонние компоненты
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { RatingModule } from "ng-starrating";
// Роуты
import { AppRoutingModule } from "./shared/routing/app-routing.module";
// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
// firebaseConfig
import { environment } from "../environments/environment";
// Сервисы
import { AuthService } from "./shared/services/auth/auth.service";
import { TMDBService } from "./shared/services/tmdb/TMDB.service";
import { ThemeService } from "./shared/services/theme/theme.service";
// Пайпы
import { NoInfoPipe } from "./shared/pipes/no-info.pipe";
import { SafePipe } from "./shared/pipes/safe.pipe";
// Компоненты
import { AppComponent } from "./app.component";
// Общие
import { FooterComponent } from "./components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PaginationComponent } from "./components/movies/pagination/pagination.component";
import { LoaderComponent } from "./components/loader/loader.component";
// Пользователи
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { FriendsComponent } from "./components/users/friends/friends.component";
import { ForgotPasswordComponent } from "./components/users/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/users/verify-email/verify-email.component";
import { SettingsComponent } from "./components/users/settings/settings.component";
import { UserComponent } from "./components/users/user/user.component";
// Фильмы
import { AddMovieComponent } from "./components/movies/add-movie/add-movie.component";
import { MovieComponent } from "./components/movies/movie/movie.component";
import { MoviesListComponent } from "./components/movies/movies-list/movies-list.component";
import { EditMovieComponent } from "./components/movies/edit-movie/edit-movie.component";
import { StarComponent } from "./components/movies/star/star.component";
import { RatedComponent } from "./components/users/rated/rated.component";
import { DiscoverComponent } from "./components/movies/discover/discover.component";
import { DiscoveredMovieComponent } from "./components/movies/discovered-movie/discovered-movie.component";

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
