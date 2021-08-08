import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerziuretiKalendoriusComponent } from './perziureti-kalendorius.component';

describe('PerziuretiKalendoriusComponent', () => {
  let component: PerziuretiKalendoriusComponent;
  let fixture: ComponentFixture<PerziuretiKalendoriusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerziuretiKalendoriusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiKalendoriusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
