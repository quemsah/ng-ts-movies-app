import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("UserService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
