import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { LoaderComponent } from "../../loader/loader.component";
import { RatedComponent } from "./rated.component";

describe("RatedComponent", () => {
  let component: RatedComponent;
  let fixture: ComponentFixture<RatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatedComponent, LoaderComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
