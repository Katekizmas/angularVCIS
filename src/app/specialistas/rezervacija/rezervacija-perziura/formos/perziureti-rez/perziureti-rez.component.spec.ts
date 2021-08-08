import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PerziuretiRezComponent } from "./perziureti-rez.component";

describe("PerziuretiComponent", () => {
  let component: PerziuretiRezComponent;
  let fixture: ComponentFixture<PerziuretiRezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerziuretiRezComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiRezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
