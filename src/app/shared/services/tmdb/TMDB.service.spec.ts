import { TestBed } from "@angular/core/testing";

import { TMDBService } from "../tmdb/TMDB.service";

describe("TMDBService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TMDBService = TestBed.get(TMDBService);
    expect(service).toBeTruthy();
  });
});
