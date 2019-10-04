import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiscoveredMovieComponent } from "./discovered-movie.component";
import { SafePipe } from "src/app/shared/pipes/safe.pipe";
import { LoaderComponent } from "../../loader/loader.component";

describe("DiscoveredMovieComponent", () => {
  let component: DiscoveredMovieComponent;
  let fixture: ComponentFixture<DiscoveredMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveredMovieComponent, LoaderComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveredMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
