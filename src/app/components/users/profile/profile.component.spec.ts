import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent, MatSnackBar, SafePipe],
      imports: [MatSnackBarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
