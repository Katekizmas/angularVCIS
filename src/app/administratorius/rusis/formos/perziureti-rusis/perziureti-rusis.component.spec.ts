import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiRusisComponent } from './perziureti-rusis.component';

describe('PerziuretiRusisComponent', () => {
  let component: PerziuretiRusisComponent;
  let fixture: ComponentFixture<PerziuretiRusisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiRusisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiRusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
