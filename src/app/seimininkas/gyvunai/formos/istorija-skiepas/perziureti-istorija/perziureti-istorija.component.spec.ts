import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiIstorijaComponent } from './perziureti-istorija.component';

describe('PerziuretiIstorijaComponent', () => {
  let component: PerziuretiIstorijaComponent;
  let fixture: ComponentFixture<PerziuretiIstorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiIstorijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiIstorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
