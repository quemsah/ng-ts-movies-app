import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { TMDBService } from "../tmdb/TMDB.service";

describe("TMDBService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule],
      providers: [TMDBService],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );
  it("should be created", () => {
    const service: TMDBService = TestBed.get(TMDBService);
    expect(service).toBeTruthy();
  });
});
