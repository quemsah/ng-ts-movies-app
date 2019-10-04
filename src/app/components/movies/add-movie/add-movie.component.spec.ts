import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddMovieComponent } from "./add-movie.component";
import { SafePipe } from "../../../shared/pipes/safe.pipe";

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
