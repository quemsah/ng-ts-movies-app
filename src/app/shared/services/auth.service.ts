import { Injectable, NgZone } from "@angular/core";
import { User } from "../services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any; // Данные пользователя

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    /* Cохраняем данные пользователя в localstorage
    и удаляем, когда он выходит */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["profile"]);
        });
        this.SetUserAuthData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        this.SetUserAuthData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  UpdateUserPassword(password) {
    return this.afAuth.auth.currentUser
      .updatePassword(password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["login"]);
        });
        window.alert("Password successfully changed!");
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email-address"]);
    });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Залогинен ли юзер?
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Google Authentication
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["profile"]);
        });
        this.SetUserAuthData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Записываем данные пользователя
  SetUserAuthData(user, data = null) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      aboutMe: data.aboutMe
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  UpdateUserAboutMe(user, data) {
    this.SetUserAuthData(user, { aboutMe: data });
  }

  UpdateUserName(newName) {
    return this.afAuth.auth.currentUser
      .updateProfile({
        displayName: newName
      })
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["profile"]);
        });
        this.SetUserAuthData(this.afAuth.auth.currentUser);
        window.alert("Name successfully changed!");
      })
      .catch(error => {
        //window.alert(error.message);
      });
  }

  getAllUserData(id) {
    return this.afs.collection('users', ref => ref
      .where('uid', '==', id)
    ).valueChanges();
  }
  
  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }
}
