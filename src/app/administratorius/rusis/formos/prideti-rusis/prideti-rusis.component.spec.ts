import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PridetiRusisComponent } from './prideti-rusis.component';

describe('PridetiRusisComponent', () => {
  let component: PridetiRusisComponent;
  let fixture: ComponentFixture<PridetiRusisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PridetiRusisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PridetiRusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
