import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifyEmailComponent } from "./verify-email.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { SafePipe } from "../../../shared/pipes/safe.pipe";

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
