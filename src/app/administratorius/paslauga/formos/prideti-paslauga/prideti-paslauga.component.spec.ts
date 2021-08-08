import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PridetiPaslaugaComponent } from './prideti-paslauga.component';

describe('PridetiPaslaugaComponent', () => {
  let component: PridetiPaslaugaComponent;
  let fixture: ComponentFixture<PridetiPaslaugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PridetiPaslaugaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PridetiPaslaugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
