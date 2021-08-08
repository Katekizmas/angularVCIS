import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendoriusComponent } from './kalendorius.component';

describe('KalendoriusComponent', () => {
  let component: KalendoriusComponent;
  let fixture: ComponentFixture<KalendoriusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalendoriusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KalendoriusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
