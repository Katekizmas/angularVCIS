import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaPerziuraComponent } from './rezervacija-perziura.component';

describe('RezervacijaPerziuraComponent', () => {
  let component: RezervacijaPerziuraComponent;
  let fixture: ComponentFixture<RezervacijaPerziuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezervacijaPerziuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijaPerziuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
