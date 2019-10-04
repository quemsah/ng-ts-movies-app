import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoaderComponent } from "../../loader/loader.component";
import { DiscoverComponent } from "./discover.component";

describe("DiscoverComponent", () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverComponent, LoaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
