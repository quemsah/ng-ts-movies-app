import { TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { UserService } from "./user.service";

describe("UserService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule
      ],
      providers: [UserService, AngularFireStorage],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
