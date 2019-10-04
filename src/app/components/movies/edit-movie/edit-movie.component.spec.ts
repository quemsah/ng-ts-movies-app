import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditMovieComponent } from "./edit-movie.component";
import { SafePipe } from "src/app/shared/pipes/safe.pipe";

describe("EditMovieComponent", () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMovieComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
