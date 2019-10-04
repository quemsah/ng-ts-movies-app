import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { VerifyEmailComponent } from "./verify-email.component";

describe("VerifyEmailMessageComponent", () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailComponent, SafePipe],
      imports: [ReactiveFormsModule, MatSnackBarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
