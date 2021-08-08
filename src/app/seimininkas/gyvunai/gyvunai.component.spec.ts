import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyvunaiComponent } from './gyvunai.component';

describe('GyvunaiComponent', () => {
  let component: GyvunaiComponent;
  let fixture: ComponentFixture<GyvunaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GyvunaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GyvunaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
