import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterTestingModule } from "@angular/router/testing";

describe("AuthService", () => {
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
      providers: [AuthService, AngularFireStorage],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it("should be created", () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
