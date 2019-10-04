import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SafePipe } from "../../../shared/pipes/safe.pipe";
import { PaginationComponent } from "./pagination.component";

describe("PaginationComponent", () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
