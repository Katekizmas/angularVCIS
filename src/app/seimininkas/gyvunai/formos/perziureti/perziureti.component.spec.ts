import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerziuretiComponent } from './perziureti.component';

describe('PerziuretiComponent', () => {
  let component: PerziuretiComponent;
  let fixture: ComponentFixture<PerziuretiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerziuretiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerziuretiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
