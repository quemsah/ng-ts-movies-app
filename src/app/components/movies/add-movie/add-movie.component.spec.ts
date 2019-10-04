import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { AddMovieComponent } from "./add-movie.component";

describe("AddMovieComponent", () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovieComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
