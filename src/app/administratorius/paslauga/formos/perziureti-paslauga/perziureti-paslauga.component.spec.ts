import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiPaslaugaComponent } from './perziureti-paslauga.component';

describe('PerziuretiPaslaugaComponent', () => {
  let component: PerziuretiPaslaugaComponent;
  let fixture: ComponentFixture<PerziuretiPaslaugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiPaslaugaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiPaslaugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
