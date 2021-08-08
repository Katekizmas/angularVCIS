import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaPriemimasComponent } from './rezervacija-priemimas.component';

describe('RezervacijaPriemimasComponent', () => {
  let component: RezervacijaPriemimasComponent;
  let fixture: ComponentFixture<RezervacijaPriemimasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezervacijaPriemimasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijaPriemimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
