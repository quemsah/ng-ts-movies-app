import { TestBed } from "@angular/core/testing";

import { MovieService } from "./movie.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterTestingModule } from "@angular/router/testing";

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
