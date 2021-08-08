import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PridetiDarbuotojaComponent } from './prideti-darbuotoja.component';

describe('PridetiDarbuotojaComponent', () => {
  let component: PridetiDarbuotojaComponent;
  let fixture: ComponentFixture<PridetiDarbuotojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PridetiDarbuotojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PridetiDarbuotojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
