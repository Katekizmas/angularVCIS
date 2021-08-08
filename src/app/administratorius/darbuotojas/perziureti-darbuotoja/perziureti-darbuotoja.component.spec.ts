import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiDarbuotojaComponent } from './perziureti-darbuotoja.component';

describe('PerziuretiDarbuotojaComponent', () => {
  let component: PerziuretiDarbuotojaComponent;
  let fixture: ComponentFixture<PerziuretiDarbuotojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiDarbuotojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiDarbuotojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
