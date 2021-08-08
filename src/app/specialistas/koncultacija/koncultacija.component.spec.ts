import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoncultacijaComponent } from './koncultacija.component';

describe('KoncultacijaComponent', () => {
  let component: KoncultacijaComponent;
  let fixture: ComponentFixture<KoncultacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoncultacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KoncultacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
