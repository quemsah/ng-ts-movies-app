import { TestBed } from "@angular/core/testing";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { MovieService } from "./movie.service";

describe("MovieService", () => {
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
      providers: [MovieService, AngularFireStorage]
    })
  );

  it("should be created", () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });
});
