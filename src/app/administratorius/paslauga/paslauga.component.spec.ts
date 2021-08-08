import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaslaugaComponent } from './paslauga.component';

describe('PaslaugaComponent', () => {
  let component: PaslaugaComponent;
  let fixture: ComponentFixture<PaslaugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaslaugaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaslaugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
