import { TestBed } from "@angular/core/testing";

import { TMDBService } from "../tmdb/TMDB.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";

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
