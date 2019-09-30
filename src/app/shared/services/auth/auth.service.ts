import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
// удали следующую строчку чтобы сломать деплой
import "firebase/storage";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AlertService } from "../alert/alert.service";
import { User } from "../../models/user";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private ADMIN_KEY = "cXVlbXNhdXJvc2U=";
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
        // Разделение функционала админа и клиента: информация о текущем юзере приходит после авторизации
        // в веб-токене и в идеале должна содержать поле админ ли юзер, но Firebase так не умеет
        // Точнее умеет, но дополнительные поля (custom claims) добавляются только
        // через Admin SDK, для которого нужен бэк прям бэк, что-то на ноде или джаве.
        // И здесь, к сожалению, на клиенте, приходится проверять админ ли он
        // как бы имитируем, что это пришло с бэкенда:
        this.userData.isAdmin = this.checkRole(user); // еще см. AuthLogin(provider)
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
    return this.afs.collection(`users/${this.userData.uid}/friends`);
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["movies"]);
        });
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
    return (
      this.currentUser
        // tslint:disable-next-line: deprecation
        .reauthenticateAndRetrieveDataWithCredential(credentials)
        .then(() => {
          this.currentUser
            .updatePassword(password)
            .then(result => {
              this.ngZone.run(() => {
                this.router.navigate(["login"]);
              });
              this.alertService.openSuccessAlert("Password successfully changed!", 3);
            })
            .catch(this.errCatching);
        })
        .catch(this.errCatching)
    );
  }

  UpdateUserName(newName) {
    return (
      this.currentUser
        // обновляем встроенный методом AngularFireAuth.auth
        .updateProfile({ displayName: newName })
        .then(result => {
          // юзер и так в профиле, не редиректим
          // и обновляем в AngularFirestore
          this.profileRef.set({ displayName: newName }, { merge: true });
          this.alertService.openSuccessAlert("Name successfully changed!", 3);
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
        this.alertService.openInfoAlert("Password reset email sent, check your inbox.", 3);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

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
        // admin.auth().updateUser(uid, {emailVerified: true});
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

  UploadNewAvatar(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files[0] as File;
    console.log("file.type: ", file.type);
    // image/jpeg image/png image/tiff image/gif
    if (file.type.slice(0, 5) === "image") {
      const path = "users/" + this.currentUser.uid + "/" + file.name;
      const ref = this.storage.ref(path);
      const sub = ref
        .put(file)
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const photoURL = await ref.getDownloadURL().toPromise();
            // обновляем встроенный методом AngularFireAuth.auth
            await this.currentUser.updateProfile({ photoURL });
            // обновляем в FireStore
            await this.profileRef.update({ photoURL });
            await this.alertService.openSuccessAlert(
              "You have successfully changed your profile picture",
              3
            );
            sub.unsubscribe();
          })
        )
        .subscribe();
    } else {
      this.alertService.openWarningAlert("Picture format not supported", 2);
    }
  }

  DeleteAvatar() {
    return this.currentUser
      .updateProfile({ photoURL: "" })
      .then(result => {
        this.profileRef.set({ photoURL: "" }, { merge: true });
        this.alertService.openSuccessAlert("Image successfully deleted!", 3);
      })
      .catch(this.errCatching);
  }

  // Записываем данные пользователя документ
  SetUserData(user, verified?: boolean) {
    console.log("e-mail verified ?: ", verified ? verified : user.emailVerified);
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

  errCatching = error => this.alertService.openWarningAlert(error.message, 3);
}
