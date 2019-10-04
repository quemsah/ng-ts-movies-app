import { TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { AlertService } from "./alert.service";

describe("AlertService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [AlertService],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it("should be created", () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
