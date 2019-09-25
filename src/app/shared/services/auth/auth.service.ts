import { Injectable, NgZone } from "@angular/core";
import { User } from "../../models/user";
import { auth } from "firebase/app";
// import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { AlertService } from "../alert/alert.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private ADMIN_KEY = "cXVlbXNh";
  // Данные пользователя из authState
  userData: User;

  constructor(
    private alertService: AlertService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // Cохраняем данные пользователя в localStorage
    // и удаляем, когда он выходит
    // отсюда и берутся данные пользователя во многих страничках (userData)
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // имитация Firebase Authentication's JWT custom claims см. комментарии AuthLogin(provider)
        this.userData.isAdmin = this.checkRole(user);
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
        console.log(this.userData.email + ": admin = " + this.userData.isAdmin);
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  checkRole = user => user.email.lastIndexOf(window.atob(this.ADMIN_KEY), 0) === 0;

  // Залогинен ли юзер?
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Админ ли?
  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.isAdmin !== false ? true : false;
  }
  // Текущий пользователь
  get currentUser() {
    return this.afAuth.auth.currentUser;
  }
  // Ссылка на документ
  get profileRef() {
    return this.afs.doc(`users/${this.currentUser.uid}`);
  }

  friendsRef() {
    // console.log(this.userData.uid);
    return this.afs.collection(`users/${this.userData.uid}/friends`);
  }

  // fetchFriends(): Observable<any> {
  //   return this.afs.collection(`users/${this.userData.uid}/friends`).valueChanges();
  // }

  // get watchLaterRef() {
  //   return this.afs.collection(`users/${this.currentUser.uid}/watchlater`);
  // }

  // get favouritesRef() {
  //   return this.afs.collection(`users/${this.currentUser.uid}/favourites`);
  // }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["movies"]);
        });
        // console.log(result.user);
        this.SetUserData(result.user);
      })
      .catch(this.errCatching);
  }

  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch(this.errCatching);
  }

  UpdateUserPassword(password, oldPassword) {
    // старые данные юзера
    const credentials = auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
    // для обновления пароля нужен ре-логин
    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credentials)
      .then(() => {
        this.currentUser
          .updatePassword(password)
          .then(result => {
            this.ngZone.run(() => {
              this.router.navigate(["login"]);
            });
            this.alertService.openSuccessAlert("Password successfully changed!", 1);
          })
          .catch(this.errCatching);
      })
      .catch(this.errCatching);
  }

  UpdateUserName(newName) {
    return (
      this.currentUser
        // обновляем встроенный методом AngularFireAuth.auth
        .updateProfile({ displayName: newName })
        .then(result => {
          // юзер и так в профиле
          // this.ngZone.run(() => {
          //   this.router.navigate(["profile"]);
          // });
          // и обновляем в AngularFirestore
          this.profileRef.set({ displayName: newName }, { merge: true });
          this.alertService.openSuccessAlert("Name successfully changed!", 2);
        })
        .catch(this.errCatching)
    );
  }

  SendVerificationMail() {
    return this.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email"]);
    });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alertService.openInfoAlert("Password reset email sent, check your inbox.", 2);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // GithubAuth() {
  //   return this.AuthLogin(new auth.GithubAuthProvider());
  // }

  // MicrosoftAuth() {
  //   return this.AuthLogin(new auth.OAuthProvider("microsoft.com"));
  // }

  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["movies"]);
        });
        // в случае логина через гитхаб или майкрософт emailVerified будет false
        // так как Firebase ставит именно так, и это создает проблемы со входом, так как есть
        // пользователи, которые зарегистрировались через почту и emailVerified которых надо проверять
        // (result.user.emailVerified == false)
        this.SetUserData(result.user, true);
        this.profileRef.set({ emailVerified: true }, { merge: true });
        // попытки тщетны, так как править поле emailVerified Firebase позволяет только
        // админам, а мне нет смысла тянуть весь админский пакет фич только для этого
        // admin.auth().updateUser(kUserUid, {
        //   emailVerified: true,
        // });
        // UPD: Firebase Admin SDK на клиенте поставить нельзя
        // https://stackoverflow.com/questions/42534283/include-the-firebase-admin-sdk-module-in-angularjs
        return result.user.getIdToken();
        // Именно из возвращаемого токена можно было бы понять, админ юзер или нет
        // https://firebase.google.com/docs/auth/admin/custom-claims?hl=en-us#examples_and_use_cases
        // Но для того чтобы установить собственные custom claims нужен Admin SDK на каком-нибудь сервере
      })
      .then(jwt => {
        // JSON Web Token
        // console.log(jwt);
      })
      .catch(this.errCatching);
  }

  UploadNewAvatar(event: any): void {
    const file = event.target.files[0];
    const path = "users/" + this.currentUser.uid + "/" + file.name;
    const ref = this.storage.ref(path);
    const sub = ref
      .put(file)
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          const photoURL = await ref.getDownloadURL().toPromise();
          // обновляем встроенный методом AngularFireAuth.auth
          await this.currentUser.updateProfile({ photoURL: photoURL });
          // обновляем в FireStore
          await this.profileRef.update({ photoURL });
          await this.alertService.openSuccessAlert(
            "You have successfully changed your profile picture",
            2
          );
          sub.unsubscribe();
        })
      )
      .subscribe();
  }

  DeleteAvatar() {
    return this.currentUser
      .updateProfile({ photoURL: "" })
      .then(result => {
        this.profileRef.set({ photoURL: "" }, { merge: true });
        this.alertService.openSuccessAlert("Image successfully deleted!", 2);
      })
      .catch(this.errCatching);
  }

  // Записываем данные пользователя документ
  SetUserData(user, verified?: boolean) {
    // console.log(verified ? verified : user.emailVerified);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: verified ? verified : user.emailVerified,
      isAdmin: this.checkRole(user)
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }

  errCatching = error => this.alertService.openWarningAlert(error.message, 2);
}
