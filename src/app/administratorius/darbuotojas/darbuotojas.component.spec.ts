import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarbuotojasComponent } from './darbuotojas.component';

describe('DarbuotojasComponent', () => {
  let component: DarbuotojasComponent;
  let fixture: ComponentFixture<DarbuotojasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarbuotojasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarbuotojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
