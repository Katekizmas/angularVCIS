import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Puslapis500Component } from './puslapis500.component';
describe('Puslapis500Component', () => {
  let component: Puslapis500Component;
  let fixture: ComponentFixture<Puslapis500Component>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Puslapis500Component]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Puslapis500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
