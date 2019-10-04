import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment.prod";
import { SafePipe } from "../../shared/pipes/safe.pipe";
import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, SafePipe],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule
      ],
      providers: [AngularFireStorage, AngularFirestore],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
