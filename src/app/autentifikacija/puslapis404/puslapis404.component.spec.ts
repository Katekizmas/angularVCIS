import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Puslapis404Component } from './puslapis404.component';
describe('Puslapis404Component', () => {
  let component: Puslapis404Component;
  let fixture: ComponentFixture<Puslapis404Component>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Puslapis404Component]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Puslapis404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
