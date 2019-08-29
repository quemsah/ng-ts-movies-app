import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "../../components/login/login.component";
import { RegisterComponent } from "../../components/register/register.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { ForgotPasswordComponent } from "../../components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "../../components/verify-email/verify-email.component";

// canActivate сервисы
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "verify-email-address",
    component: VerifyEmailComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
