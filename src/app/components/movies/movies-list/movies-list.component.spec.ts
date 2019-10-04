import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { LoaderComponent } from "../../loader/loader.component";
import { MoviesListComponent } from "./movies-list.component";

describe("MoviesListComponent", () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListComponent, LoaderComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
