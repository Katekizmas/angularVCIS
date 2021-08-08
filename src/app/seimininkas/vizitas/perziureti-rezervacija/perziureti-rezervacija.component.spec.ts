import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiRezervacijaComponent } from './perziureti-rezervacija.component';

describe('PerziuretiRezervacijaComponent', () => {
  let component: PerziuretiRezervacijaComponent;
  let fixture: ComponentFixture<PerziuretiRezervacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiRezervacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiRezervacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
