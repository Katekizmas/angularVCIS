import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PamirstasSlaptazodisComponent } from './pamirstas-slaptazodis.component';
describe('PamirstasSlaptazodisComponent', () => {
  let component: PamirstasSlaptazodisComponent;
  let fixture: ComponentFixture<PamirstasSlaptazodisComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PamirstasSlaptazodisComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PamirstasSlaptazodisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
