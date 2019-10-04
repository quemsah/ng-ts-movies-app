import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { LoaderComponent } from "../../loader/loader.component";
import { MovieComponent } from "./movie.component";

describe("MovieComponent", () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent, LoaderComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
