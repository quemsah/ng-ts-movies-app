import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// Роуты
import { AppRoutingModule } from "./shared/routing/app-routing.module";
// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// firebaseConfig
import { environment } from "../environments/environment";
// Сервисы
import { AuthService } from "./shared/services/auth.service";
// Компоненты
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavigationComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
