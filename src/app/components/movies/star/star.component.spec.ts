import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { LoaderComponent } from "../../loader/loader.component";
import { StarComponent } from "./star.component";

describe("StarComponent", () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarComponent, LoaderComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
