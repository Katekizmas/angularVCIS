import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PridetiComponent } from './prideti.component';

describe('PridetiComponent', () => {
  let component: PridetiComponent;
  let fixture: ComponentFixture<PridetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PridetiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PridetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
