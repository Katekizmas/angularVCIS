import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RusisComponent } from './rusis.component';

describe('RusisComponent', () => {
  let component: RusisComponent;
  let fixture: ComponentFixture<RusisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RusisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RusisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
