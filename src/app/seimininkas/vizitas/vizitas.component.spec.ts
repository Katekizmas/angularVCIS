import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizitasComponent } from './vizitas.component';

describe('VizitasComponent', () => {
  let component: VizitasComponent;
  let fixture: ComponentFixture<VizitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VizitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VizitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
