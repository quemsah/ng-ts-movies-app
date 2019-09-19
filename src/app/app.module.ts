import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// MatSnackBar (замена window.alert)
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
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
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { FriendsComponent } from "./components/users/friends/friends.component";
import { ForgotPasswordComponent } from "./components/users/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/users/verify-email/verify-email.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { AddMovieComponent } from "./components/movies/add-movie/add-movie.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MovieComponent } from "./components/movies/movie/movie.component";
import { MoviesListComponent } from "./components/movies/movies-list/movies-list.component";
import { EditMovieComponent } from "./components/movies/edit-movie/edit-movie.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { UserComponent } from './components/users/user/user.component';

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
    NoInfoPipe,
    PaginationComponent,
    SettingsComponent,
    SafePipe,
    UserComponent
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
    MatSnackBarModule
  ],
  providers: [AuthService, AngularFireStorage, TMDBService, Title, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
